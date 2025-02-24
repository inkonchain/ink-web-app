"use client";
import React from "react";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";

import { Backdrop } from "@/components/Backdrop";
import { Button } from "@/components/Button/Button";
import {
  CenteredModal,
  CenteredModalContainer,
} from "@/components/CenteredModal";
import { ColoredText } from "@/components/ColoredText";
import { useModal } from "@/hooks/useModal";

import { BlockExplorerButton } from "../BlockExplorerButton";

import { useBridgeTransactionModal } from "./BridgeTransactionModalContext";
import animation from "./BroadcastSent-checkMark.json";

export interface BridgeTransactionModalProps {}

export const BridgeTransactionModal: React.FC<
  BridgeTransactionModalProps
> = () => {
  const t = useTranslations("Bridge");
  const { isOpen, setIsOpen, txHash, setTxHash } = useBridgeTransactionModal();
  useModal({ isOpen, closeModal, modalKey: "bridge-transaction-modal" });

  function closeModal() {
    setIsOpen(false);
    setTxHash(null);
  }

  if (!isOpen) return null;
  if (!txHash) return null;

  return (
    <CenteredModalContainer className="fixed inset-0 isolate z-9999">
      <Backdrop isVisible={isOpen} onClick={closeModal} />
      <CenteredModal
        isOpen={isOpen}
        closeModal={closeModal}
        contentClassName="max-w-[390px] flex-1 relative z-10000 dark:text-white/50 shadow-[0px_4px_45px_0px_rgba(0,0,0,0.25)] dark:bg-softDarkPurple"
      >
        <div className="flex flex-col gap-2 items-center">
          <Lottie
            animationData={animation}
            loop={false}
            className="w-[200px]"
          />
          <div className="flex flex-col gap-6 items-center">
            <ColoredText
              variant="purple"
              className="text-2xl font-bold text-center"
            >
              {t("transactionSubmitted")}
            </ColoredText>
            <p className="text-center text-md">
              {t.rich("bridgingTime", {
                network: (network) => <strong>{network}</strong>,
              })}
            </p>
          </div>
        </div>
        <div className="mt-[45px] flex justify-center">
          <BlockExplorerButton transactionHash={txHash} />
        </div>
        <div className="w-full mt-[108px]">
          <Button
            onClick={closeModal}
            variant="primary"
            size="lg"
            className="w-full"
          >
            {t("done")}
          </Button>
        </div>
      </CenteredModal>
    </CenteredModalContainer>
  );
};
