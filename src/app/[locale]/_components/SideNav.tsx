"use client";

import { useEffect, useState } from "react";
import { InkLayoutSideNav, InkNavLink } from "@inkonchain/ink-kit";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import {
  hrefObjectFromHrefPropWithQuery,
  HrefProp,
  Link,
  pathFromHrefProp,
  usePathname,
} from "@/routing";

import { useLinks } from "./links";
import { ThemeToggle } from "./ThemeToggle";

export const SideNav = () => {
  const links = useLinks();

  return (
    <InkLayoutSideNav
      bottom={
        <div>
          <ThemeToggle />
        </div>
      }
      links={links.map(({ href, icon, label, exactHref }) => ({
        href,
        asChild: true,
        icon,
        children: (
          <SideNavLink href={href} exactHref={exactHref}>
            {label}
          </SideNavLink>
        ),
      }))}
    />
  );
};

function SideNavLink({
  className,
  href,
  exactHref,
  children,
  ...rest
}: {
  className?: string;
  href: HrefProp;
  exactHref?: boolean;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const query = useRouterQuery();
  const hrefPath = pathFromHrefProp(href);
  const hrefObject = hrefObjectFromHrefPropWithQuery(href, query);
  const [selected, setSelected] = useState(
    exactHref ? path === hrefPath : path.startsWith(hrefPath)
  );
  useEffect(() => {
    setSelected(exactHref ? path === hrefPath : path.startsWith(hrefPath));
  }, [path, hrefPath, exactHref]);

  return (
    <InkNavLink
      onClick={() => {
        setSelected(true);
      }}
      active={
        (exactHref ? path === hrefPath : path.startsWith(hrefPath)) || selected
      }
      asChild
    >
      <Link href={hrefObject} prefetch={true} {...rest}>
        {children}
      </Link>
    </InkNavLink>
  );
}
