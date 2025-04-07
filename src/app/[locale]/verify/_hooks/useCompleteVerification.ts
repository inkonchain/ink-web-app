import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { showErrorToast, showSuccessToast } from "../_components/VerifyToast";

interface CompleteVerificationResponse {
  attestation_uid: string;
  kraken_user_iban: string;
  user_address: string;
  created_at: string;
  transaction_hash: string;
  status: string;
  message: string;
}

interface ErrorResponse {
  status: number;
  message: string;
}

export const useCompleteVerification = (callback: () => void) => {
  const t = useTranslations("Verify");
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // Use a ref to track if verification has already started
  const verificationStarted = useRef(false);

  const clearVerificationParams = useCallback(() => {
    const verifyPage = searchParams.get("verifyPage") ? "?verifyPage=true" : "";
    router.replace(window.location.pathname + verifyPage, { scroll: false });
  }, [router, searchParams]);

  const { mutate, isPending, isError, isSuccess, data } = useMutation<
    CompleteVerificationResponse,
    Error
  >({
    // Add a mutationKey based on code and state to ensure mutation only executes once
    mutationKey: code && state ? [`verification-${code}-${state}`] : undefined,
    mutationFn: async () => {
      console.log(
        "EXECUTING MUTATION FN, verificationStarted:",
        verificationStarted.current
      );

      if (!code || !state) {
        throw new Error("Missing code or state parameters");
      }

      // We don't need this check - it's preventing the API call entirely
      // if (verificationStarted.current) {
      //   console.log('VERIFICATION ALREADY STARTED, RETURNING EMPTY DATA');
      //   return {
      //     attestation_uid: '',
      //     kraken_user_iban: '',
      //     user_address: '',
      //     created_at: '',
      //     transaction_hash: '',
      //     status: 'duplicate',
      //     message: 'Duplicate verification call prevented'
      //   } as CompleteVerificationResponse;
      // }

      console.log("MAKING ACTUAL API CALL");
      const response = await fetch("/api/auth/verifications/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorData = responseData as ErrorResponse;
        throw new Error(
          errorData.message ||
            `Failed to complete verification: ${response.status}`
        );
      }

      return responseData;
    },
    onSuccess: (data) => {
      if (data.status === "success" && data.transaction_hash) {
        showSuccessToast(
          t("toast.success.title"),
          t("toast.success.description"),
          data.transaction_hash
        );
      }

      callback();
      clearVerificationParams();
    },
    onError: (error) => {
      let errorMessage =
        error.message || "Could not get verified. Please try again later.";

      if (errorMessage.includes("Address already has a valid verification")) {
        errorMessage = "This wallet address is already verified.";
      } else if (errorMessage.includes("Kraken account must be verified")) {
        errorMessage =
          "Your Kraken account must be verified before completing this process.";
      } else if (
        errorMessage.includes(
          "This Kraken Account is already verifying address"
        )
      ) {
        errorMessage =
          "This Kraken account is already associated with another wallet address.";
      } else if (errorMessage.includes("Verification limit reached")) {
        const dateMatch = errorMessage.match(
          /Try again after (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC)/
        );
        const availableDate = dateMatch ? dateMatch[1] : "";

        errorMessage = availableDate
          ? `Verification limit reached. Please try again after ${availableDate}.`
          : "Verification limit reached for this Kraken account. Please try again later.";
      }

      callback();
      showErrorToast(errorMessage);
      clearVerificationParams();
    },
  });

  const completeVerification = useCallback(() => {
    console.log(
      "COMPLETE VERIFICATION CALLED, verificationStarted:",
      verificationStarted.current
    );

    if (code && state) {
      // Even if we're already started, we'll log it but not call mutate() again
      if (verificationStarted.current) {
        console.log("VERIFICATION ALREADY STARTED, SKIPPING DUPLICATE CALL");
        return;
      }

      console.log("CALLING MUTATE");
      verificationStarted.current = true;
      mutate();
    }
  }, [code, state, mutate]);

  useEffect(() => {
    console.log(
      "USE EFFECT RUNNING, verificationStarted:",
      verificationStarted.current
    );

    // Don't set verificationStarted to true here, let completeVerification handle it
    // verificationStarted.current = true;

    if (code && state) {
      console.log("CALLING COMPLETE VERIFICATION");
      completeVerification();
    }

    // Cleanup function to reset the ref when component unmounts
    return () => {
      console.log("USE EFFECT CLEANUP");
      // Don't reset on unmount during development StrictMode double-mounting
      // verificationStarted.current = false;
    };
  }, [code, state, completeVerification]);

  return {
    isCompletingVerification: isPending,
    isError,
    isSuccess,
    data,
    hasSuccessfullySignedInToKraken: Boolean(code && state),
  };
};
