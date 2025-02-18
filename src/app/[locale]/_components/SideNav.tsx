"use client";

import { useEffect, useState } from "react";
import { InkIcon, InkLayoutSideNav } from "@inkonchain/ink-kit";

import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import {
  hrefObjectFromHrefPropWithQuery,
  HrefProp,
  Link,
  pathFromHrefProp,
  usePathname,
} from "@/routing";
import { classNames } from "@/util/classes";

import { ThemeToggle } from "./ThemeToggle";

export const SideNav = () => {
  const hasVerifyPage = useFeatureFlag("verifyPage");

  return (
    <InkLayoutSideNav
      bottom={
        <div>
          <ThemeToggle />
        </div>
      }
      links={[
        {
          asChild: true,
          children: (
            <SideNavLink href="/" exactHref>
              Home
            </SideNavLink>
          ),
          href: "/",
          icon: <InkIcon.Home size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/apps">Apps</SideNavLink>,
          href: "/apps",
          icon: <InkIcon.Apps size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/bridge">Bridge</SideNavLink>,
          href: "/bridge",
          icon: <InkIcon.Bridge size="icon-lg" enforce="inherit" />,
        },

        ...(hasVerifyPage
          ? [
              {
                asChild: true,
                children: <SideNavLink href="/verify">Verify</SideNavLink>,
                href: "/verify",
                icon: <InkIcon.CheckFill size="icon-lg" enforce="inherit" />,
              },
            ]
          : []),
        {
          asChild: true,
          children: <SideNavLink href="/builders">Build</SideNavLink>,
          href: "/builders",
          icon: <InkIcon.Code size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/community">Community</SideNavLink>,
          href: "/community",
          icon: <InkIcon.Users size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/about">About</SideNavLink>,
          href: "/about",
          icon: <InkIcon.Info size="icon-lg" enforce="inherit" />,
        },
      ]}
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
    <Link
      {...rest}
      className={classNames(
        className,
        ((exactHref ? path === hrefPath : path.startsWith(hrefPath)) ||
          selected) &&
          "ink:text-text-on-secondary ink:bg-button-secondary"
      )}
      href={hrefObject}
      onClick={() => {
        setSelected(true);
      }}
      prefetch={true}
    >
      {children}
    </Link>
  );
}
