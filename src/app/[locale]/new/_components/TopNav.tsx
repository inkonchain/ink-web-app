"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { PillContainer } from "@/components/PillContainer";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, routing, usePathname } from "@/routing";
import { classNames } from "@/util/classes";

export const TopNav = () => {
  const t = useTranslations("Menu");
  const pathname = usePathname();
  const query = useRouterQuery();
  // To support an optimistic click
  const [selected, setSelected] = useState(pathname);
  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <PillContainer variant="ink-kit">
      <nav className="flex items-center *:px-3 *:h-10 *:flex *:items-center *:transition-opacity hover:*:opacity-50">
        <Link
          href={{
            pathname: routing.pathnames["/new"],
            query,
          }}
          className={classNames("ink:text-body-3-regular", {
            "ink:text-body-3-bold": selected === "/new",
          })}
          prefetch
          onClick={() => setSelected("/new")}
        >
          {t("about")}
        </Link>
        <Link
          href={{
            pathname: routing.pathnames["/new/dashboard"],
            query,
          }}
          className={classNames("ink:text-body-3-regular", {
            "ink:text-body-3-bold": selected.startsWith("/new/dashboard"),
          })}
          prefetch
          onClick={() => setSelected("/new/dashboard")}
        >
          {t("ecosystem")}
        </Link>
      </nav>
    </PillContainer>
  );
};
