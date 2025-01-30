import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { FeatureFlagKey, getFeatureFlags } from "@/util/feature-flags";

export function useFeatureFlag(flag: FeatureFlagKey) {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const flags = getFeatureFlags();
    const originalType = typeof flags[flag];
    const inParam = searchParams.get(flag);
    switch (originalType) {
      case "number":
        const result = parseInt(inParam ?? "");
        if (isNaN(result)) {
          return flags[flag];
        }
        return result;
      case "boolean":
        return inParam === "true"
          ? true
          : inParam === "false"
            ? false
            : flags[flag];
      default:
        return flags[flag];
    }
  }, [flag, searchParams]);
}
