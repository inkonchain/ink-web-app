import React from "react";
import { Button, InkIcon, useModalContext } from "@inkonchain/ink-kit";

import { EXTERNAL_LINKS, Link } from "@/routing";
import { classNames } from "@/util/classes";

import { NEWSLETTER_MODAL_KEY } from "./Modals/NewsletterModal";

interface SocialLinksRowProps {
  className?: string;
  includeMail?: boolean;
}

export const SocialLinksRow: React.FC<SocialLinksRowProps> = ({
  className,
  includeMail = true,
}) => {
  const { openModal: openNewsletterModal } =
    useModalContext(NEWSLETTER_MODAL_KEY);

  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-4",
        className
      )}
    >
      <Button variant="transparent" size="md" asChild rounded="full">
        <Link
          href={EXTERNAL_LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InkIcon.Social.X />
        </Link>
      </Button>

      <Button variant="transparent" size="md" asChild rounded="full">
        <Link
          href={EXTERNAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InkIcon.Social.Telegram />
        </Link>
      </Button>

      <Button variant="transparent" size="md" asChild rounded="full">
        <Link
          href={EXTERNAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InkIcon.Social.Github />
        </Link>
      </Button>

      {includeMail && (
        <Button
          name="mail-icon-button"
          aria-label="newsletter"
          variant="transparent"
          className={className}
          size="md"
          rounded="full"
          onClick={openNewsletterModal}
        >
          <InkIcon.Mail />
        </Button>
      )}
    </div>
  );
};
