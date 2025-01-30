"use client";

import { InkLayoutMobileNav } from "@inkonchain/ink-kit";

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
      ]}
    />
  );
}
