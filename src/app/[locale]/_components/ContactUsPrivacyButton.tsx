"use client";

import React from "react";

import { useContactUsModalContext } from "@/components/ContactUsModal/ContactUsModalContext";

export interface ContactUsPrivacyButtonProps {
  text: string;
}

export const ContactUsPrivacyButton: React.FC<ContactUsPrivacyButtonProps> = ({
  text,
}) => {
  const { setIsOpen } = useContactUsModalContext();
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="text-blue-500 hover:underline"
    >
      {text}
    </button>
  );
};
