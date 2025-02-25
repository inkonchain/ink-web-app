"use client";

import React from "react";
import { Button, useModalContext } from "@inkonchain/ink-kit";

import { CONTACT_US_MODAL_KEY } from "./Modals/ContactUsModal";

export interface ContactUsPrivacyButtonProps {
  text: string;
}

export const ContactUsPrivacyButton: React.FC<ContactUsPrivacyButtonProps> = ({
  text,
}) => {
  const { openModal } = useModalContext(CONTACT_US_MODAL_KEY);
  return (
    <button
      className="ml-1 underline inline-text hover:cursor-pointer"
      onClick={openModal}
    >
      {text}
    </button>
  );
};
