"use client";

import {
  InkIcon,
  InkLayoutMobileNav,
  useInkLayoutContext,
} from "@inkonchain/ink-kit";

import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

export function MobileNav() {
  const { setIsMobileNavOpen } = useInkLayoutContext();

  function closeMobileNavigation() {
    setIsMobileNavOpen(false);
  }

  const hasVerifyPage = useFeatureFlag("verifyPage");
  const query = useRouterQuery();
  return (
    <InkLayoutMobileNav
      links={[
        {
          href: "/new",
          asChild: true,
          icon: <InkIcon.Home />,
          children: (
            <Link
              href={{ pathname: "/new", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Home
            </Link>
          ),
        },
        {
          href: "/new/apps",
          asChild: true,
          icon: <InkIcon.Apps />,
          children: (
            <Link
              href={{ pathname: "/new/apps", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Apps
            </Link>
          ),
        },
        {
          href: "/new/bridge",
          asChild: true,
          icon: <InkIcon.Bridge />,
          children: (
            <Link
              href={{ pathname: "/new/bridge", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Bridge
            </Link>
          ),
        },
        ...(hasVerifyPage
          ? [
              {
                href: "/new/verify",
                asChild: true,
                icon: <InkIcon.CheckFill />,
                children: (
                  <Link
                    href={{ pathname: "/new/verify", query }}
                    onClick={closeMobileNavigation}
                    prefetch
                  >
                    Verify
                  </Link>
                ),
              },
            ]
          : []),
        {
          href: "/new/build",
          asChild: true,
          icon: <InkIcon.Code />,
          children: (
            <Link
              href={{ pathname: "/new/builders", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Build
            </Link>
          ),
        },
        {
          href: "/new/community",
          asChild: true,
          icon: <InkIcon.Users />,
          children: (
            <Link
              href={{ pathname: "/new/community", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Community
            </Link>
          ),
        },
        {
          href: "/new/about",
          asChild: true,
          icon: <InkIcon.Info />,
          children: (
            <Link
              href={{ pathname: "/new/about", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              About
            </Link>
          ),
        },
      ]}
    />
  );
}
