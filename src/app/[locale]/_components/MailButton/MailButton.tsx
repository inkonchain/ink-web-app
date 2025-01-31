"use client";

import { Button } from "@inkonchain/ink-kit";

import { useContactUsModalContext } from "@/components/ContactUsModal/ContactUsModalContext";
import { MailIcon } from "@/components/icons/Mail";

export const MailButton = () => {
  const { setIsOpen } = useContactUsModalContext();

  return (
    <div className="flex justify-center w-full">
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="mail"
        size="lg"
        variant="primary"
        className="w-full sm:hidden duration-300 transition-[box-shadow] hover:shadow-krakenPurple/50 hover:shadow-large-pop"
        iconLeft={
          <MailIcon className="shrink-0" size="icon-lg" enforce="white" />
        }
      >
        Contact Us
      </Button>
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="mail"
        size="lg"
        variant="primary"
        className="hidden sm:flex duration-300 transition-[box-shadow] hover:shadow-krakenPurple/50 hover:shadow-large-pop"
        rounded="full"
      >
        <MailIcon className="shrink-0" size="icon-lg" enforce="white" />
      </Button>
    </div>
  );
};
