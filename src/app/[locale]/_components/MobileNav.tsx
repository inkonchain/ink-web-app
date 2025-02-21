"use client";

import {
  InkIcon,
  InkLayoutMobileNav,
  useInkLayoutContext,
} from "@inkonchain/ink-kit";

import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const { setIsMobileNavOpen } = useInkLayoutContext();

  function closeMobileNavigation() {
    setIsMobileNavOpen(false);
  }

  const hasVerifyPage = useFeatureFlag("verifyPage");
  const query = useRouterQuery();
  return (
    <InkLayoutMobileNav
      bottom={
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      }
      links={[
        {
          href: "/",
          asChild: true,
          icon: <InkIcon.Home />,
          children: (
            <Link
              href={{ pathname: "/", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Home
            </Link>
          ),
        },
        {
          href: "/apps",
          asChild: true,
          icon: <InkIcon.Apps />,
          children: (
            <Link
              href={{ pathname: "/apps", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Apps
            </Link>
          ),
        },
        {
          href: "/bridge",
          asChild: true,
          icon: <InkIcon.Bridge />,
          children: (
            <Link
              href={{ pathname: "/bridge", query }}
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
                href: "/verify",
                asChild: true,
                icon: <InkIcon.CheckFill />,
                children: (
                  <Link
                    href={{ pathname: "/verify", query }}
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
          href: "/build",
          asChild: true,
          icon: <InkIcon.Code />,
          children: (
            <Link
              href={{ pathname: "/builders", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Build
            </Link>
          ),
        },
        {
          href: "/community",
          asChild: true,
          icon: <InkIcon.Users />,
          children: (
            <Link
              href={{ pathname: "/community", query }}
              onClick={closeMobileNavigation}
              prefetch
            >
              Community
            </Link>
          ),
        },
        {
          href: "/about",
          asChild: true,
          icon: <InkIcon.Info />,
          children: (
            <Link
              href={{ pathname: "/about", query }}
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
