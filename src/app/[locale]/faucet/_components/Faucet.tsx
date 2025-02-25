"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Input } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import { newLayoutSectionClasses } from "@/components/styles/container";

import { FaucetRequestButton } from "./FaucetRequestButton";

export function Faucet() {
  const t = useTranslations("Faucet");
  const [address, setAddress] = useState("");
  const hasSetInitialAddress = useRef(false);
  const [requestSuccess, setRequestSuccess] = useState<boolean | null>(null);
  const { address: connectedAddress, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && connectedAddress && !hasSetInitialAddress.current) {
      setAddress(connectedAddress);
      hasSetInitialAddress.current = true;
    }
  }, [isConnected, connectedAddress]);

  return (
    <>
      <div className={newLayoutSectionClasses()}>
        <form className="max-w-(--breakpoint-lg) flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t("enterAddress")}
          />
          <FaucetRequestButton
            type="submit"
            onChange={setRequestSuccess}
            address={address}
          >
            {t("requestTokens")}
          </FaucetRequestButton>
        </form>
      </div>
      {requestSuccess && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          gravity={0.5}
          recycle={false}
        />
      )}
    </>
  );
}
