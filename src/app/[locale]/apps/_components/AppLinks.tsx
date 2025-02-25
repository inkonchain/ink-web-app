import React from "react";
import { Button, InkIcon } from "@inkonchain/ink-kit";

import { classNames } from "@/util/classes";

import { InkApp, InkAppNetwork } from "./InkApp";

export function AppLinks({
  className,
  links,
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
          <InkIcon.Social.X />
        </AppLink>
      )}
      {links.discord && (
        <AppLink href={links.discord}>
          <InkIcon.Social.Discord />
        </AppLink>
      )}
      {links.telegram && (
        <AppLink href={links.telegram}>
          <InkIcon.Social.Telegram />
        </AppLink>
      )}
      {links.farcaster && (
        <AppLink href={links.farcaster}>
          <InkIcon.Social.Farcaster />
        </AppLink>
      )}
      {links.github && (
        <AppLink href={links.github}>
          <InkIcon.Social.Github />
        </AppLink>
      )}
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
    <Button
      variant="transparent"
      asChild
      size="md"
      className="backdrop-blur-none"
    >
      <a
        href={href}
        className="p-2 size-10"
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </a>
    </Button>
  );
}
