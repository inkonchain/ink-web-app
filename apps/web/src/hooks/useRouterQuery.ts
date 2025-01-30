"use client";

import { useMemo } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

import { hardcodedFeatureFlags } from "@/util/feature-flags";

export function useRouterQuery() {
  const searchParams = useSearchParams();

  return useMemo(() => {
    if (searchParams.size === 0) {
      return "";
    }

    const onlyFeatureFlags = new ReadonlyURLSearchParams(
      Array.from(searchParams.entries()).filter(
        ([key]) => key in hardcodedFeatureFlags
      )
    );
    return onlyFeatureFlags.toString();
  }, [searchParams]);
}
