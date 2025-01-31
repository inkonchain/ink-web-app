"use client";
import React from "react";
import { Button, ButtonProps } from "@inkonchain/ink-kit";

import { ArrowOnHover } from "@/components/ArrowOnHover";
import { ButtonLink as LegacyButtonLink } from "@/components/Button/ButtonLink";
import { BridgeIcon } from "@/components/icons/Bridge";
import { DiscordIcon } from "@/components/icons/Discord";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { EXTERNAL_LINKS, Link } from "@/routing";
import { classNames } from "@/util/classes";

export interface MainCallToActionButtonProps {
  variant?: ButtonProps["variant"] | "spotlight";
  copy: {
    ctaLabel: string;
    discordCtaLabel: string;
  };
  /** For some reason, the only button that should have a larger width is the main "hero" call to action button */
  isMainCallToAction?: boolean;
}

export const MainCallToActionButton: React.FC<MainCallToActionButtonProps> = (
  props
) => {
  return (
    <OnlyWithFeatureFlag
      flag="mainnet"
      otherwise={<DiscordMainCallToActionButton {...props} />}
    >
      <BridgeNowMainCallToActionButton {...props} />
    </OnlyWithFeatureFlag>
  );
};

const DiscordMainCallToActionButton: React.FC<MainCallToActionButtonProps> = ({
  variant = "primary",
  copy,
  isMainCallToAction = false,
}) => {
  if (variant === "spotlight") {
    /** TODO: Remove this if the button component is updated to have this variant */
    return (
      <LegacyButtonLink
        href={EXTERNAL_LINKS.discord}
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        variant={variant}
        className={classNames("group justify-center items-center", {
          "px-20": isMainCallToAction,
        })}
        icon={
          <DiscordIcon className="shrink-0" size="icon-lg" enforce="inherit" />
        }
      >
        <span
          className={classNames(
            `inline-flex items-center gap-1 whitespace-nowrap`
          )}
        >
          <span>{copy.discordCtaLabel}</span>
          <ArrowOnHover external enforce="inherit" />
        </span>
      </LegacyButtonLink>
    );
  }

  return (
    <Button
      asChild
      size="lg"
      variant={variant}
      className={classNames(
        "group justify-center items-center duration-300 transition-[box-shadow] hover:shadow-krakenPurple/50 hover:shadow-large-pop",
        {
          "px-20": isMainCallToAction,
        }
      )}
      iconLeft={
        <DiscordIcon
          className="shrink-0"
          size="icon-lg"
          enforce={variant !== "primary" ? "inherit" : "white"}
        />
      }
    >
      <Link
        href={EXTERNAL_LINKS.discord}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          <span>{copy.discordCtaLabel}</span>
          <ArrowOnHover
            external
            enforce={variant !== "primary" ? "inherit" : "white"}
          />
        </span>
      </Link>
    </Button>
  );
};

const BridgeNowMainCallToActionButton: React.FC<
  MainCallToActionButtonProps
> = ({ variant = "primary", copy, isMainCallToAction = false }) => {
  const query = useRouterQuery();
  if (variant === "spotlight") {
    /** TODO: Remove this if the button component is updated to have this variant */
    return (
      <LegacyButtonLink
        href={{
          pathname: "/dashboard",
          query: {
            ...Object.fromEntries(new URLSearchParams(query) || {}),
            category: "bridge",
          },
        }}
        size="lg"
        variant={variant}
        className={classNames("group justify-center items-center", {
          "px-20": isMainCallToAction,
        })}
        icon={
          <BridgeIcon className="shrink-0" size="icon-lg" enforce="inherit" />
        }
      >
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          {copy.ctaLabel}
        </span>
      </LegacyButtonLink>
    );
  }

  return (
    <Button
      asChild
      size="lg"
      variant={variant}
      className={classNames(
        "group justify-center items-center duration-300 transition-[box-shadow] hover:shadow-krakenPurple/50 hover:shadow-large-pop",
        {
          "px-20": isMainCallToAction,
        }
      )}
      iconLeft={
        <BridgeIcon
          className="shrink-0"
          size="icon-lg"
          enforce={variant !== "primary" ? "inherit" : "white"}
        />
      }
    >
      <Link
        href={{
          pathname: "/dashboard",
          query: {
            ...Object.fromEntries(new URLSearchParams(query) || {}),
            category: "bridge",
          },
        }}
      >
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          {copy.ctaLabel}
        </span>
      </Link>
    </Button>
  );
};
