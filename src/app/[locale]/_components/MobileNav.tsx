"use client";

import { InkLayoutMobileNav, useInkLayoutContext } from "@inkonchain/ink-kit";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { useLinks } from "./links";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const { setIsMobileNavOpen } = useInkLayoutContext();

  function closeMobileNavigation() {
    setIsMobileNavOpen(false);
  }

  const query = useRouterQuery();
  const links = useLinks();

  return (
    <InkLayoutMobileNav
      bottom={
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      }
      links={links.map(({ href, icon, label }) => ({
        href,
        asChild: true,
        icon,
        children: (
          <Link
            href={{ pathname: href, query }}
            onClick={closeMobileNavigation}
            prefetch
          >
            {label}
          </Link>
        ),
      }))}
    />
  );
}
