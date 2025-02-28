"use client";

import { useEffect, useState } from "react";
import { InkLayoutSideNav } from "@inkonchain/ink-kit";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import {
  hrefObjectFromHrefPropWithQuery,
  Link,
  pathFromHrefProp,
  usePathname,
} from "@/routing";

import { useLinks } from "./links";
import { ThemeToggle } from "./ThemeToggle";

export const SideNav = () => {
  const links = useLinks();

  const query = useRouterQuery();
  const path = usePathname();

  const [selected, setSelected] = useState(path);

  useEffect(() => {
    setSelected(path);
  }, [path]);

  return (
    <InkLayoutSideNav
      bottom={
        <div>
          <ThemeToggle />
        </div>
      }
      links={links.map(({ href, icon, label, exactHref }) => {
        const hrefPath = pathFromHrefProp(href);
        return {
          href,
          asChild: true,
          leftIcon: icon,
          active: exactHref
            ? selected === hrefPath
            : selected.startsWith(hrefPath),
          children: (
            <Link
              href={hrefObjectFromHrefPropWithQuery(href, query)}
              prefetch
              onClick={() => {
                setSelected(href);
              }}
            >
              {label}
            </Link>
          ),
        };
      })}
    />
  );
};
