"use client";

import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";

import { FeatureFlagKey, hardcodedFeatureFlags } from "@/util/feature-flags";

interface OnlyWithFeatureFlagProps extends PropsWithChildren {
  flag: FeatureFlagKey;
  otherwise?: React.ReactNode;
}

export function OnlyWithFeatureFlag({
  flag,
  children,
  otherwise = null,
}: OnlyWithFeatureFlagProps) {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get(flag);

  // Check URL parameter first, then fall back to hardcoded value
  const isActive =
    paramValue === "true"
      ? true
      : paramValue === "false"
        ? false
        : hardcodedFeatureFlags[flag];

  return isActive ? children : otherwise;
}
