import React from "react";

import { MailIconButton } from "@/components/MailIconButton/MailIconButton";
import { EXTERNAL_LINKS, Link } from "@/routing";
import { classNames } from "@/util/classes";

import { DiscordIcon } from "./icons/Discord";
import { GitHubIcon } from "./icons/GitHub";
import { TelegramIcon } from "./icons/Telegram";
import { TwitterIcon } from "./icons/Twitter";

const socialIconClasses = () =>
  `relative group text-xl rounded-full p-2 flex items-center justify-center`;

interface SocialLinksRowProps {
  enforce?: "black";
  className?: string;
  includeMail?: boolean;
  includeDiscord?: boolean;
  faded?: boolean;
}

export const SocialLinksRow: React.FC<SocialLinksRowProps> = ({
  enforce,
  className,
  includeMail = true,
  includeDiscord = true,
  faded = false,
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-4",
        className
      )}
    >
      <Link
        className={classNames(socialIconClasses())}
        href={EXTERNAL_LINKS.twitter}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon size="icon-lg" enforce={enforce} faded={faded} />
      </Link>

      {includeDiscord && (
        <Link
          className={classNames(socialIconClasses())}
          href={EXTERNAL_LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon size="icon-lg" enforce={enforce} faded={faded} />
        </Link>
      )}

      <Link
        href={EXTERNAL_LINKS.telegram}
        className={socialIconClasses()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TelegramIcon size="icon-lg" enforce={enforce} faded={faded} />
      </Link>

      <Link
        href={EXTERNAL_LINKS.github}
        className={socialIconClasses()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon size="icon-lg" enforce={enforce} faded={faded} />
      </Link>

      {includeMail && (
        <MailIconButton
          className={socialIconClasses()}
          iconProps={{ enforce, faded: true }}
        />
      )}
    </div>
  );
};
