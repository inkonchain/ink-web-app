import React from "react";

import { DiscordIcon } from "@/components/icons/Discord";
import { GateIcon } from "@/components/icons/Gate";
import { GitHubIcon } from "@/components/icons/GitHub";
import { TelegramIcon } from "@/components/icons/Telegram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { classNames } from "@/util/classes";

import { InkApp, InkAppNetwork } from "./InkApp";

export function AppLinks({
  className,
  links,
  network,
}: {
  className?: string;
  links: InkApp["links"];
  network: InkAppNetwork;
}) {
  // const websiteUrl =
  //   network === "Testnet" ? links.testnetWebsite : links.mainnetWebsite;

  return (
    <div
      className={classNames(
        "flex flex-wrap justify-end gap-2 mt-auto",
        className
      )}
    >
      {links.x && (
        <AppLink href={links.x}>
          <TwitterIcon size="icon-md" enforce="inherit" />
        </AppLink>
      )}
      {links.discord && (
        <AppLink href={links.discord}>
          <DiscordIcon size="icon-md" enforce="inherit" />
        </AppLink>
      )}
      {links.telegram && (
        <AppLink href={links.telegram}>
          <TelegramIcon size="icon-md" enforce="inherit" />
        </AppLink>
      )}
      {links.farcaster && (
        <AppLink href={links.farcaster}>
          <GateIcon size="icon-md" enforce="inherit" />
          {/* <FarcasterIcon size="icon-md" enforce={enforce} /> */}
        </AppLink>
      )}
      {/* Not showing the website URL as the cards/rows are clickable */}
      {/* {websiteUrl && (
        <AppLink href={websiteUrl}>
          <ChainIcon size="icon-md" enforce="inherit" />
        </AppLink>
      )} */}
      {links.github && (
        <AppLink href={links.github}>
          <GitHubIcon size="icon-md" enforce="inherit" />
        </AppLink>
      )}
      {/* {links.docs && (
        <a
          href={links.docs}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
        >
          <ChainIcon size="icon-md" enforce={enforce} />
        </a>
      )} */}
    </div>
  );
}

function AppLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm hover:text-krakenPurple hover:border-krakenPurple dark:hover:border-krakenPurple transition-colors font-medium p-2 rounded-2xl"
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </a>
  );
}
