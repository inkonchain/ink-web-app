"use client";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRouter } from "@/routing";

export const HomeShortcuts = () => {
  const router = useRouter();
  const query = useRouterQuery();
  const isMainnet = useFeatureFlag("mainnet");

  const scrollToHash = (hash: string) => {
    if (typeof window === "undefined") return false;

    const element =
      hash === "#" ? document.documentElement : document.querySelector(hash);

    if (!element) return false;

    // If we're already at this hash, just scroll
    if (window.location.hash === hash) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }

    // Update URL first without scrolling
    router.push(hash as any, { scroll: false });

    // Wait for next frame to ensure DOM update
    requestAnimationFrame(() => {
      // And then wait one more frame for safety
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth" });
      });
    });

    return true;
  };

  useCallbackOnKey({
    key: "q",
    handler: () => scrollToHash("#"),
  });

  useCallbackOnKey({
    key: "a",
    handler: () => scrollToHash("#about"),
  });

  useCallbackOnKey({
    key: "b",
    handler: () => {
      router.push(
        isMainnet
          ? {
              pathname: "/dashboard",
              query: {
                ...Object.fromEntries(new URLSearchParams(query) || {}),
                category: "bridge",
              },
            }
          : "/testnet-bridge"
      );
      return true;
    },
  });

  useCallbackOnKey({
    key: "e",
    handler: () => scrollToHash("#event"),
  });

  useCallbackOnKey({
    key: "h",
    handler: () => {
      router.push({
        pathname: "/community",
        query: {
          ...Object.fromEntries(new URLSearchParams(query) || {}),
        },
      });
      return true;
    },
  });

  return null;
};
