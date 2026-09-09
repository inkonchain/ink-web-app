import React from "react";
import { Button, InkIcon } from "@inkonchain/ink-kit";

import { EXTERNAL_LINKS, Link } from "@/routing";
import { classNames } from "@/util/classes";

interface SocialLinksRowProps {
  className?: string;
}

export const SocialLinksRow: React.FC<SocialLinksRowProps> = ({
  className,
}) => {
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
    </div>
  );
};
