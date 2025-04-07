"use client";

import { FC } from "react";
import {
  Button,
  InkIcon,
  ListItem,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAddressVerificationStatus } from "@/hooks/useAddressVerificationStatus";

import { useRevocationFlow } from "../_hooks/useRevocationFlow";
import { useVerificationFlow } from "../_hooks/useVerificationFlow";
import { useCompleteVerification } from "../_hooks/useCompleteVerification";
import { VerificationSteps } from "./VerificationSteps";

export const VerifyCta: FC = () => {
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();
  const {
    data: verificationStatus,
    isLoading: isCheckingVerification,
    refetch,
  } = useAddressVerificationStatus(address);
  const { isSuccess, hasSuccessfullySignedInToKraken } =
    useCompleteVerification(refetch);

  const t = useTranslations("Verify");
  const { isConfirming, handleProveIdentity, initVerification } =
    useVerificationFlow(address);
  const { isRevoking, handleRevoke } = useRevocationFlow(address);

  const isLoading = isConnecting || isReconnecting || isCheckingVerification;

  if (isLoading) {
    return (
      <div className="relative w-90">
        <div className="h-16 animate-pulse rounded-full bg-inkPurple/15" />
      </div>
    );
  }

  if (verificationStatus?.isVerified) {
    return (
      <div className="flex items-center gap-8">
        <p className="text-center text-xl font-bold text-inkSuccess px-8 py-4.5 bg-inkSuccess/10 rounded-full">
          {t("status.walletVerified")}
        </p>
        <Popover>
          <PopoverButton asChild>
            <Button
              size="lg"
              rounded="full"
              variant="wallet"
              disabled={isRevoking}
            >
              <div className="size-8">
                {isRevoking ? (
                  <InkIcon.Loading className="animate-spin text-default/70" />
                ) : (
                  <InkIcon.Dots />
                )}
              </div>
            </Button>
          </PopoverButton>
          <PopoverPanel>
            <PopoverButton asChild>
              <ListItem onClick={handleRevoke}>{t("actions.revoke")}</ListItem>
            </PopoverButton>
          </PopoverPanel>
        </Popover>
      </div>
    );
  }

  return (
    <div className="relative w-full space-y-12">
      <VerificationSteps
        isConfirming={isConfirming}
        isRedirecting={initVerification.isSuccess}
        hasSuccessfullySignedInToKraken={hasSuccessfullySignedInToKraken}
        verificationSuccess={isSuccess}
        isConnected={isConnected}
        initVerification={initVerification}
      />
      {isConnected ? (
        <Button
          size="lg"
          variant="primary"
          onClick={handleProveIdentity}
          disabled={
            isConfirming ||
            initVerification.isSuccess ||
            hasSuccessfullySignedInToKraken
          }
          className="flex gap-2"
        >
          <p>
            {hasSuccessfullySignedInToKraken
              ? t("verificationInProgress")
              : initVerification.isSuccess
                ? t("redirecting")
                : isConfirming
                  ? t("confirmingInWallet")
                  : t("initVerificationCta")}
          </p>
          {(isConfirming ||
            initVerification.isSuccess ||
            hasSuccessfullySignedInToKraken) && (
            <InkIcon.Loading className="size-10 animate-spin grow-0" />
          )}
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
