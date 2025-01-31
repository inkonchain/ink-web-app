"use client";
import React, { useEffect, useState } from "react";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { useModal } from "@/hooks/useModal";

import { Backdrop } from "../Backdrop";
import { CenteredModal, CenteredModalContainer } from "../CenteredModal";

import { useContactUsModalContext } from "./ContactUsModalContext";

export interface ContactUsModalProps {}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({}) => {
  const { isOpen, setIsOpen } = useContactUsModalContext();

  function closeModal() {
    setIsOpen(false);
  }

  useModal({ isOpen, closeModal, modalKey: "contact-us-modal" });

  const baseUrl = "https://surveys.kraken.com/jfe/form/SV_8AgphAlvVoBgM4K";
  const [srcWithTimestamp, setSrcWithTimestamp] = useState("");

  useEffect(() => {
    const timestamp = new Date().getTime();
    setSrcWithTimestamp(`${baseUrl}?t=${timestamp}`);
  }, [baseUrl]);

  useCallbackOnKey({
    key: "c",
    handler: () => {
      setIsOpen(true);
      return true;
    },
  });

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
            title="Contact Us Modal"
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
