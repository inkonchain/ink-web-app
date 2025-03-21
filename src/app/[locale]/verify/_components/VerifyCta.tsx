"use client";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAddressVerificationStatus } from "@/hooks/useAddressVerificationStatus";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useSolveChallenge } from "@/hooks/useSolveChallenge";
import { Button } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { FC } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";

interface VerifyCtaProps {
  className?: string;
}

export const VerifyCta: FC<VerifyCtaProps> = ({ className }) => {
  const t = useTranslations("Verify");
  const [isProving, setIsProving] = useState(false);
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();
  const { data: verificationStatus, isLoading: isCheckingVerification } =
    useAddressVerificationStatus(address);
  const createChallenge = useCreateChallenge();
  const { signMessageAsync } = useSignMessage();
  const solveChallenge = useSolveChallenge();
  const router = useRouter();

  const isLoading =
    isConnecting ||
    isReconnecting ||
    isCheckingVerification ||
    isProving ||
    createChallenge.isPending ||
    solveChallenge.isPending;

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
      const solution = await solveChallenge.mutateAsync({
        challenge_id: challenge.id,
        challenge_signature: signature,
      });

      // Redirect to Kraken OAuth if challenge was solved
      if (solution.solved) {
        router.push(solution.oauth_url);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setIsProving(false);
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
      <p className="text-center text-lg font-medium text-green-600">
        ✓ Your address is verified
      </p>
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

VerifyCta.displayName = "VerifyCta";
