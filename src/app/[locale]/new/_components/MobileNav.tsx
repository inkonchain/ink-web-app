"use client";

import { InkLayoutMobileNav } from "@inkonchain/ink-kit";

import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

interface MobileNavProps {
  closeMobileNavigation: () => void;
}

export function MobileNav({
  closeMobileNavigation,
}: {
  closeMobileNavigation: () => void;
}) {
  return <Nav closeMobileNavigation={closeMobileNavigation} />;
}

function Nav({ closeMobileNavigation }: MobileNavProps) {
  const hasVerifyPage = useFeatureFlag("verifyPage");
  const query = useRouterQuery();
  return (
    <InkLayoutMobileNav
      links={[
        {
          href: "/new",
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/new", query }}
              onClick={closeMobileNavigation}
            >
              Home
            </Link>
          ),
        },
        {
          href: "/new/apps",
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/new/apps", query }}
              onClick={closeMobileNavigation}
            >
              Dashboard
            </Link>
          ),
        },
        {
          href: "/new/bridge",
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/new/bridge", query }}
              onClick={closeMobileNavigation}
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
                children: (
                  <Link
                    href={{ pathname: "/new/verify", query }}
                    onClick={closeMobileNavigation}
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
          children: (
            <Link
              href={{ pathname: "/new/builders", query }}
              onClick={closeMobileNavigation}
            >
              Build
            </Link>
          ),
        },
        {
          href: "/new/community",
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/new/community", query }}
              onClick={closeMobileNavigation}
            >
              Community
            </Link>
          ),
        },
        {
          href: "/new/about",
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/new/about", query }}
              onClick={closeMobileNavigation}
            >
              About
            </Link>
          ),
        },
      ]}
    />
  );
}
