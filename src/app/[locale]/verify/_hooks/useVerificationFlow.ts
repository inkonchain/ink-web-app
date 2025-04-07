import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSignMessage } from "wagmi";

import { useAddressVerificationStatus } from "@/hooks/useAddressVerificationStatus";
import { useCompleteVerification } from "@/hooks/useCompleteVerification";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useInitVerification } from "@/hooks/useInitVerification";

import { showErrorToast, showSuccessToast } from "../_components/VerifyToast";

export const useVerificationFlow = (address: `0x${string}` | undefined) => {
  const t = useTranslations("Verify");
  const [isConfirmingInWallet, setIsConfirmingInWallet] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const completedVerificationRef = useRef(false);
  const {
    data: verificationStatus,
    isLoading: isCheckingVerification,
    refetch: refetchAddressVerificationStatus,
  } = useAddressVerificationStatus(address);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const createChallenge = useCreateChallenge();
  const { signMessageAsync } = useSignMessage();
  const initVerification = useInitVerification();
  const completeVerification = useCompleteVerification();

  const handleInitVerification = async () => {
    if (!address) {
      return;
    }

    try {
      setIsConfirmingInWallet(true);
      const challenge = await createChallenge.mutateAsync({
        user_address: address,
      });
      const signature = await signMessageAsync({ message: challenge.message });
      const data = await initVerification.mutateAsync({
        challenge_id: challenge.id,
        challenge_signature: signature,
      });

      // Redirect to Kraken OAuth if challenge was solved
      if (data.oauth_url) {
        router.push(data.oauth_url);
      }
    } finally {
      setIsConfirmingInWallet(false);
    }
  };

  const handleCompleteVerification = useCallback(async () => {
    if (!code || !state || completedVerificationRef.current) return;
    completedVerificationRef.current = true;

    try {
      const result = await completeVerification.mutateAsync({ code, state });
      if (result.status === "success" && result.transaction_hash) {
        showSuccessToast(
          t("toast.success.title"),
          t("toast.success.description"),
          result.transaction_hash
        );
      }
    } catch (error: any) {
      showErrorToast(
        error.message || "Could not get verified. Please try again later."
      );
    } finally {
      refetchAddressVerificationStatus();
      const verifyPage = searchParams.get("verifyPage")
        ? "?verifyPage=true"
        : "";
      router.replace(window.location.pathname + verifyPage, { scroll: false });
      initVerification.reset();
      completeVerification.reset();
    }
  }, [
    code,
    state,
    initVerification,
    completeVerification,
    t,
    refetchAddressVerificationStatus,
    searchParams,
    router,
  ]);

  useEffect(() => {
    if (code && state && address) {
      handleCompleteVerification();
    }
  }, [code, state, address, handleCompleteVerification]);

  return {
    isCheckingVerification,
    isVerified: verificationStatus?.isVerified,
    isConfirming: isConfirmingInWallet,
    handleInitVerification,
    initVerification,
    completeVerification,
    hasSuccessfullySignedInToKraken: Boolean(code && state),
  };
};
