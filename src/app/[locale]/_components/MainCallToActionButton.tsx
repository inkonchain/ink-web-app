"use client";
import React from "react";
import { Button, ButtonProps } from "@inkonchain/ink-kit";

import { ButtonLink as LegacyButtonLink } from "@/components/Button/ButtonLink";
import { AppsIcon } from "@/components/icons/Apps";
import { BridgeIcon } from "@/components/icons/Bridge";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";
import { classNames } from "@/util/classes";

export interface MainCallToActionButtonProps {
  variant?: ButtonProps["variant"] | "spotlight";
  copy: {
    bridgeNow: string;
    exploreApps: string;
  };
  /** For some reason, the only button that should have a larger width is the main "hero" call to action button */
  isMainCallToAction?: boolean;
}

export const MainCallToActionButton: React.FC<MainCallToActionButtonProps> = (
  props
) => {
  return (
    <OnlyWithFeatureFlag
      flag="newNav"
      otherwise={<BridgeNowMainCallToActionButton {...props} />}
    >
      <ExploreAppsMainCallToActionButton {...props} />
    </OnlyWithFeatureFlag>
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
          {copy.bridgeNow}
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
          {copy.bridgeNow}
        </span>
      </Link>
    </Button>
  );
};

const ExploreAppsMainCallToActionButton: React.FC<
  MainCallToActionButtonProps
> = ({ variant = "primary", copy, isMainCallToAction = false }) => {
  const query = useRouterQuery();
  if (variant === "spotlight") {
    /** TODO: Remove this if the button component is updated to have this variant */
    return (
      <LegacyButtonLink
        href={{
          pathname: "/new/apps",
          query: {
            ...Object.fromEntries(new URLSearchParams(query) || {}),
          },
        }}
        size="lg"
        variant={variant}
        className={classNames("group justify-center items-center", {
          "px-20": isMainCallToAction,
        })}
        icon={
          <AppsIcon className="shrink-0" size="icon-lg" enforce="inherit" />
        }
      >
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          {copy.exploreApps}
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
        <AppsIcon
          className="shrink-0"
          size="icon-lg"
          enforce={variant !== "primary" ? "inherit" : "white"}
        />
      }
    >
      <Link
        href={{
          pathname: "/new/apps",
          query: {
            ...Object.fromEntries(new URLSearchParams(query) || {}),
          },
        }}
      >
        <span className="inline-flex items-center gap-1 whitespace-nowrap">
          {copy.exploreApps}
        </span>
      </Link>
    </Button>
  );
};
