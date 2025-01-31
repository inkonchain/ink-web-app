"use client";

import { useState } from "react";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";

import { NewsletterForm } from "./NewsletterForm";

export interface StandaloneNewsletterFormProps {
  copy: {
    ctaLabel: string;
  };
}

export const StandaloneNewsletterForm: React.FC<
  StandaloneNewsletterFormProps
> = ({ copy }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useCallbackOnKey({
    key: "Escape",
    isDisabled: !isFormOpen,
    handler: () => {
      setIsFormOpen(false);
      return true;
    },
  });

  return (
    <NewsletterForm copy={copy} isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
  );
};
