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
          href: "/new/dashboard",
          asChild: true,
          children: (
            <Link
              href={{ pathname: "/new/dashboard", query }}
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
      ]}
    />
  );
}
