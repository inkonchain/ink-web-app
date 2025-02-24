"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import { BigScalableTitle } from "@/components/BigScallableTitle";
import { ColoredText } from "@/components/ColoredText";

import { FaucetRequestButton } from "./FaucetRequestButton";

export function Faucet() {
  const t = useTranslations("Faucet");
  const [address, setAddress] = useState("");
  const hasSetInitialAddress = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [requestSuccess, setRequestSuccess] = useState<boolean | null>(null);
  const { address: connectedAddress, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && connectedAddress && !hasSetInitialAddress.current) {
      setAddress(connectedAddress);
      hasSetInitialAddress.current = true;
    }
  }, [isConnected, connectedAddress]);

  return (
    <div className="flex flex-col items-center gap-8 flex-1">
      <div className="flex flex-col items-center sm:justify-center sm:gap-10 gap-6 flex-1">
        <BigScalableTitle
          title={t("title")}
          subtitle={
            <ColoredText
              className="text-center text-2xl mb-4 font-medium"
              variant="purple"
              dampen="md"
            >
              {t("description")}
            </ColoredText>
          }
        />

        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-4xl px-4">
          <div className="relative w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                buttonRef.current?.click();
              }}
            >
              <div className="flex items-center justify-between w-full min-w-[320px] sm:min-w-[680px] bg-white rounded-[36px] border border-white/25 py-2">
                <div className="pl-8 pr-4 flex-1">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t("enterAddress")}
                    className="w-full bg-transparent text-black/50 not-placeholder-shown:text-[#101114] focus:outline-hidden font-[Plus_Jakarta_Sans] font-bold text-[18px]"
                  />
                </div>
                <div className="pr-1">
                  <FaucetRequestButton
                    ref={buttonRef}
                    type="submit"
                    className="w-[160px]"
                    onChange={setRequestSuccess}
                    address={address}
                  >
                    {t("requestTokens")}
                  </FaucetRequestButton>
                </div>
              </div>
            </form>
          </div>
        </div>
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
    </div>
  );
}
