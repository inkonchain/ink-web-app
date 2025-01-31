"use client";

import { useEffect, useState } from "react";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, routing, usePathname } from "@/routing";
import { classNames } from "@/util/classes";

export const TopNav = () => {
  const pathname = usePathname();
  const query = useRouterQuery();
  // To support an optimistic click
  const [selected, setSelected] = useState(pathname);
  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <nav className="flex items-center gap-8">
      <Link
        href={{
          pathname: routing.pathnames["/new/dashboard"],
          query,
        }}
        className={classNames("text-sm hover:opacity-70", {
          "ink:text-text-primary font-semibold": selected === "/new/dashboard",
        })}
        prefetch
        onClick={() => setSelected("/new/dashboard")}
      >
        Dashboard (Placeholder)
      </Link>
    </nav>
  );
};
