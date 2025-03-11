"use client";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAddressVerificationStatus } from "@/hooks/useAddressVerificationStatus";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useInitVerification } from "@/hooks/useInitVerification";
import { useRevokeVerification } from "@/hooks/useRevokeVerification";
import { Button } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastOptions } from "react-toastify";
import { useAccount, useSignMessage } from "wagmi";

interface VerifyCtaProps {
  className?: string;
}

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  className: "w-xl",
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export const VerifyCta: FC<VerifyCtaProps> = ({ className }) => {
  const searchParams = useSearchParams();
  const t = useTranslations("Verify");
  const [isProving, setIsProving] = useState(false);
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();
  const { data: verificationStatus, isLoading: isCheckingVerification } =
    useAddressVerificationStatus(address);
  const createChallenge = useCreateChallenge();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const initVerification = useInitVerification();
  const revokeVerification = useRevokeVerification();
  const [isRevoking, setIsRevoking] = useState(false);

  // Check for status and message in URL params
  useEffect(() => {
    const status = searchParams.get("status");
    const message = searchParams.get("message");

    if (status && message) {
      if (status === "success") {
        toast.success(message, toastOptions);
      } else {
        toast.error(message, toastOptions);
      }

      // Only keep verifyPage param if it exists
      const params = searchParams.get("verifyPage") ? "?verifyPage=true" : "";
      router.replace(window.location.pathname + params, { scroll: false });
    }
  }, [searchParams, router]);

  const isLoading =
    isConnecting ||
    isReconnecting ||
    isCheckingVerification ||
    isProving ||
    isRevoking ||
    createChallenge.isPending ||
    initVerification.isPending ||
    revokeVerification.isPending;

  const handleProveIdentity = async () => {
    if (!address) return;

    try {
      setIsProving(true);

      // Create challenge
      const challenge = await createChallenge.mutateAsync({
        user_address: address,
      });

      // Sign the challenge message
      const signature = await signMessageAsync({
        message: challenge.message,
      });

      // Solve challenge
      const data = await initVerification.mutateAsync({
        challenge_id: challenge.id,
        challenge_signature: signature,
      });

      // Redirect to Kraken OAuth if challenge was solved
      if (data.oauth_url) {
        router.push(data.oauth_url);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setIsProving(false);
    }
  };

  const handleRevokeVerification = async () => {
    if (!address) return;

    try {
      setIsRevoking(true);

      // Create challenge
      const challenge = await createChallenge.mutateAsync({
        user_address: address,
      });

      // Sign the challenge message
      const signature = await signMessageAsync({
        message: challenge.message,
      });

      // Revoke verification
      const data = await revokeVerification.mutateAsync({
        challenge_id: challenge.id,
        challenge_signature: signature,
      });

      if (data.status === "success") {
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.error("Error during revocation:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to revoke verification",
        toastOptions
      );
    } finally {
      setIsRevoking(false);
    }
  };

  // Loading skeleton with same height as final content
  if (isLoading) {
    return (
      <div className={`relative w-80 ${className ?? ""}`}>
        <div className="h-12 animate-pulse rounded-full bg-whiteMagic dark:bg-gray-800" />
      </div>
    );
  }

  // Show verified state
  if (verificationStatus?.isVerified) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-lg font-medium text-green-600">
          ✓ Your address is verified
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={handleRevokeVerification}
          disabled={isLoading}
        >
          {isRevoking ? t("revokingVerification") : t("revokeVerification")}
        </Button>
      </div>
    );
  }

  // Show action buttons
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      {isConnected ? (
        <Button
          size="lg"
          variant="primary"
          onClick={handleProveIdentity}
          disabled={isLoading}
        >
          {t("proveIdentity")}
        </Button>
      ) : (
        <ConnectWalletButton connectLabel={t("cta")} size="lg" />
      )}
    </div>
  );
};
