"use client";
import React from "react";
import { useTranslations } from "next-intl";

import { ArrowOnHover } from "@/components/ArrowOnHover";
import { useContactUsModalContext } from "@/components/ContactUsModal/ContactUsModalContext";
import { KeyboardShortcut } from "@/components/KeyboardShortcut";

export interface ContactUsHeaderButtonProps {
  className: string;
}

export const ContactUsHeaderButton: React.FC<ContactUsHeaderButtonProps> = ({
  className,
}) => {
  const t = useTranslations("Menu");
  const { setIsOpen } = useContactUsModalContext();
  return (
    <button className={className} onClick={() => setIsOpen(true)}>
      {t("contact")}
      <ArrowOnHover />
      <KeyboardShortcut letter="C" opacity="light" size="sm" />
    </button>
  );
};
