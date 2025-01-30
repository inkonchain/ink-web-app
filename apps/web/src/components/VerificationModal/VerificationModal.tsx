"use client";
import React, { useEffect, useState } from "react";

import { useModal } from "@/hooks/useModal";

import { Backdrop } from "../Backdrop";
import { CenteredModal, CenteredModalContainer } from "../CenteredModal";

import { useVerificationModalContext } from "./VerificationModalContext";

export interface VerificationModalProps {
  iframeUrl?: string;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  iframeUrl,
}) => {
  const { isOpen, setIsOpen } = useVerificationModalContext();

  function closeModal() {
    setIsOpen(false);
  }

  useModal({
    isOpen,
    closeModal,
    modalKey: "verification-modal",
  });

  const baseUrl =
    iframeUrl ?? "https://surveys.kraken.com/jfe/form/SV_b1VtoIEAznLivA2";
  const [srcWithTimestamp, setSrcWithTimestamp] = useState("");

  useEffect(() => {
    const timestamp = new Date().getTime();
    setSrcWithTimestamp(`${baseUrl}?t=${timestamp}`);
  }, [baseUrl]);

  if (!isOpen) return null;

  return (
    <CenteredModalContainer className="fixed inset-0 isolate z-[9999]">
      <Backdrop isVisible={isOpen} onClick={closeModal} />
      <CenteredModal
        isOpen={isOpen}
        closeModal={closeModal}
        contentClassName="relative z-[10000]"
      >
        <div className="sm:w-96 max-h-[600px] h-[450px] pt-6">
          <iframe
            title="Verification Modal"
            className="w-full h-full"
            src={srcWithTimestamp}
            width="100%"
            height="100%"
          />
        </div>
      </CenteredModal>
    </CenteredModalContainer>
  );
};
