"use client";
import React, { useEffect, useState } from "react";
import { Modal, useModalContext } from "@inkonchain/ink-kit";
import { useTheme } from "next-themes";

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

  const theme = useTheme();

  return (
    <Modal id={CONTACT_US_MODAL_KEY} hasBackdrop title="Contact Us">
      {() => (
        /** min-w-[580px] calculated somewhat manually here so that it fits the modal :shrug: */
        <div className="max-h-[600px] h-[450px] w-full sm:min-w-[580px]">
          <iframe
            title="Contact Us Modal"
            className="w-full h-full bg-transparent"
            src={srcWithTimestamp}
            width="100%"
            height="100%"
            style={{
              /** For some reason, if we put "dark" here, it displays a white background (with proper dark theme styles). auto works, _but_ doesn't work on light... so here we go  */
              colorScheme: theme.theme === "dark" ? "auto" : "only light",
            }}
          />
        </div>
      )}
    </Modal>
  );
};
