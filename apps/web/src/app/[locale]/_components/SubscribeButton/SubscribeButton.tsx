"use client";

import { Button } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";

import { BellIcon } from "@/components/icons/Bell";
import { useNewsletterModalContext } from "@/components/NewsletterModal/NewsletterModalContext";

export const SubscribeButton = () => {
  const t = useTranslations("Landing");
  const { setIsOpen } = useNewsletterModalContext();

  return (
    <Button
      onClick={() => setIsOpen(true)}
      className="w-full items-center justify-center duration-300 transition-[box-shadow] hover:shadow-krakenPurple/50 hover:shadow-large-pop"
      aria-label="contact"
      size="lg"
      variant="primary"
      iconLeft={
        <BellIcon className="shrink-0" size="icon-lg" enforce="white" />
      }
    >
      {t("subscribe:cta")}
    </Button>
  );
};
