"use client";
import React, { useEffect, useState } from "react";
import { Modal, useModalContext } from "@inkonchain/ink-kit";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";

export const CONTACT_US_MODAL_KEY = "contact-us-modal";

export interface ContactUsModalProps {}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({}) => {
  const { openModal } = useModalContext(CONTACT_US_MODAL_KEY);

  const baseUrl = "https://surveys.kraken.com/jfe/form/SV_8AgphAlvVoBgM4K";
  const [srcWithTimestamp, setSrcWithTimestamp] = useState("");

  useEffect(() => {
    const timestamp = new Date().getTime();
    setSrcWithTimestamp(`${baseUrl}?t=${timestamp}`);
  }, [baseUrl]);

  useCallbackOnKey({
    key: "c",
    handler: () => {
      openModal();
      return true;
    },
  });

  return (
    <Modal id={CONTACT_US_MODAL_KEY} hasBackdrop title="Contact Us">
      {() => (
        <div className="max-h-[600px] h-[450px]">
          <iframe
            title="Contact Us Modal"
            className="w-full h-full"
            src={srcWithTimestamp}
            width="100%"
            height="100%"
          />
        </div>
      )}
    </Modal>
  );
};
