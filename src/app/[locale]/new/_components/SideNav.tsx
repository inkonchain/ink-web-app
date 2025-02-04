"use client";

import { InkLayoutSideNav } from "@inkonchain/ink-kit";

import { AppsIcon } from "@/components/icons/Apps";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, usePathname } from "@/routing";

export const SideNav = () => {
  const path = usePathname();
  const query = useRouterQuery();

  if (path === "/new") {
    return false;
  }

  return (
    <InkLayoutSideNav
      links={[
        {
          asChild: true,
          children: (
            <Link href={{ pathname: "/new/dashboard", query }}>Apps</Link>
          ),
          href: "/new/dashboard",
          icon: <AppsIcon size="icon-lg" />,
        },
      ]}
    />
  );
};
