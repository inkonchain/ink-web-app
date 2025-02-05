"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import { ConnectWalletButton } from "@/app/[locale]/_components/ConnectWalletButton";
import { ColoredText } from "@/components/ColoredText";

import { Verifications } from "./Verifications";
import { VerifyInfoCard } from "./VerifyInfoCard";

export function VerifyContent() {
  const t = useTranslations("Verify");
  const { address: connectedAddress, isConnected } = useAccount();

  return (
    <div className="flex flex-col gap-8 flex-1 px-4">
      <div className="flex flex-col sm:gap-10 gap-6 flex-1">
        <div className="flex flex-col items-start gap-4 max-w-2xl">
          <ColoredText
            className="text-4xl sm:text-6xl font-medium"
            variant="purple"
            dampen="md"
          >
            <h2>{t("title")}</h2>
          </ColoredText>
          <div className="text-blackMagic/50 dark:text-whiteMagic/50 text-md max-w-lg">
            {t("description")}
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
          <div className="relative w-full">
            <ConnectWalletButton connectLabel={t("cta")} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VerifyInfoCard
          className="flex-1"
          icon={
            <Image
              src="/verify/info-checkmark.png"
              alt="A coin with a checkmark inside"
              width={100}
              height={100}
            />
          }
          title={t("whatIsVerify.title")}
          description={<div>{t("whatIsVerify.description")}</div>}
        />
        <VerifyInfoCard
          className="flex-1"
          icon={
            <Image
              src="/verify/info-lock.png"
              alt="An hexagonal coin with a lock inside"
              width={100}
              height={100}
            />
          }
          title={t("whyVerify.title")}
          description={<div>{t("whyVerify.description")}</div>}
        />
        <VerifyInfoCard
          className="flex-1"
          icon={
            <Image
              src="/verify/info-checkmark.png"
              alt="A coin with a checkmark inside"
              width={100}
              height={100}
            />
          }
          title={t("yourPrivacy.title")}
          description={<div>{t("yourPrivacy.description")}</div>}
        />
      </div>

      <Verifications />
    </div>
  );
}
