"use client";

import type { FC } from "react";
import { useEffect } from "react";
import React from "react";
import { Bounce, toast, ToastOptions } from "react-toastify";
import {
  Button,
  InkIcon,
  ListItem,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@inkonchain/ink-kit";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAccount, useSignMessage } from "wagmi";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAddressVerificationStatus } from "@/hooks/useAddressVerificationStatus";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useInitVerification } from "@/hooks/useInitVerification";
import { useRevokeVerification } from "@/hooks/useRevokeVerification";

import { Stepper } from "./Stepper";
import { VerifyToast } from "./VerifyToast";

interface VerifyCtaProps {
  className?: string;
}

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  transition: Bounce,
  closeButton: false,
};

const successToastOptions: ToastOptions = {
  ...toastOptions,
  className: "!p-0 !bg-transparent !shadow-none",
};

export const VerifyCta: FC<VerifyCtaProps> = ({ className }) => {
  const searchParams = useSearchParams();
  const t = useTranslations("Verify");
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();
  const { data: verificationStatus, isLoading: isCheckingVerification } =
    useAddressVerificationStatus(address);
  const createChallenge = useCreateChallenge();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const initVerification = useInitVerification();
  const revokeVerification = useRevokeVerification();

  // Check for status and message in URL params
  useEffect(() => {
    const status = searchParams.get("status");
    const message = searchParams.get("message");
    const txHash = searchParams.get("txHash");

    if (status && txHash) {
      if (status === "success") {
        toast(VerifyToast, {
          ...successToastOptions,
          data: {
            title: t("toast.success.title"),
            description: t("toast.success.description"),
            txHash,
          },
        });
      } else {
        toast.error(message, toastOptions);
      }

      // Only keep verifyPage param if it exists
      const params = searchParams.get("verifyPage") ? "?verifyPage=true" : "";
      router.replace(window.location.pathname + params, { scroll: false });
    }
  }, [searchParams, router, t]);

  const isLoading = isConnecting || isReconnecting || isCheckingVerification;

  const handleProveIdentity = async () => {
    if (!address) return;

    try {
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
    }
  };

  const handleRevokeVerification = async () => {
    if (!address) return;

    try {
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
        toast(VerifyToast, {
          ...successToastOptions,
          data: {
            title: t("toast.revoke.title"),
            description: t("toast.revoke.description"),
            txHash: data.transaction_hash,
          },
        });
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.error("Error during revocation:", error);
      toast.error(
        error instanceof Error ? error.message : t("toast.error.revoke"),
        toastOptions
      );
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

  const verificationSteps = [
    {
      title: t("flow.step1.title"),
      description: t("flow.step1.description"),
      completed: searchParams.get("status") === "success" || isConnected,
    },
    {
      title: t("flow.step2.title"),
      description: t("flow.step2.description"),
      completed:
        searchParams.get("status") === "success" ||
        initVerification.isPending ||
        initVerification.isSuccess,
    },
    {
      title: t("flow.step3.title"),
      description: t("flow.step3.description"),
      completed: searchParams.get("status") === "success",
    },
    {
      title: t("flow.step4.title"),
      description: t("flow.step4.description"),
      completed: searchParams.get("status") === "success",
    },
  ];

  // Show verified state
  if (verificationStatus?.isVerified) {
    return (
      <div className="flex items-center gap-8">
        <p className="text-center text-xl font-bold text-green-600 px-8 py-4.5 bg-green-500/10 rounded-full">
          You wallet is verified
        </p>
        <Popover>
          <PopoverButton asChild>
            <Button
              size="lg"
              rounded="full"
              variant="wallet"
              disabled={isLoading}
            >
              <div className="size-8">
                <InkIcon.Dots />
              </div>
            </Button>
          </PopoverButton>
          <PopoverPanel>
            <ListItem onClick={handleRevokeVerification}>Revoke</ListItem>
          </PopoverPanel>
        </Popover>
      </div>
    );
  }

  // Show action buttons
  return (
    <div className={`relative w-full space-y-12 ${className ?? ""}`}>
      <Stepper steps={verificationSteps} />
      {isLoading ? (
        <div className={`relative w-80 ${className ?? ""}`}>
          <div className="h-12 animate-pulse rounded-full bg-whiteMagic dark:bg-gray-800" />
        </div>
      ) : isConnected ? (
        <Button
          size="lg"
          variant="primary"
          onClick={handleProveIdentity}
          disabled={isLoading}
        >
          {t("initVerificationCta")}
        </Button>
      ) : (
        <ConnectWalletButton
          connectLabel={t("cta")}
          size="lg"
          variant="primary"
          noIcon
        />
      )}
    </div>
  );
};
