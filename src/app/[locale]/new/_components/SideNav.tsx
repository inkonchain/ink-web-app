"use client";

import { InkIcon, InkLayoutSideNav } from "@inkonchain/ink-kit";

import { AppsIcon } from "@/components/icons/Apps";
import { BridgeIcon } from "@/components/icons/Bridge";
import { AboutBulletIcon } from "@/components/icons/bullets/About";
import { BuildersBulletIcon } from "@/components/icons/bullets/Builders";
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

export const SideNav = () => {
  const hasVerifyPage = useFeatureFlag("verifyPage");

  return (
    <InkLayoutSideNav
      links={[
        {
          asChild: true,
          children: (
            <SideNavLink href="/new" exactHref>
              Home
            </SideNavLink>
          ),
          href: "/new",
          icon: <InkIcon.Home size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/new/apps">Apps</SideNavLink>,
          href: "/new/apps",
          icon: <AppsIcon size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/new/bridge">Bridge</SideNavLink>,
          href: "/new/bridge",
          icon: <BridgeIcon size="icon-lg" enforce="inherit" />,
        },

        ...(hasVerifyPage
          ? [
              {
                asChild: true,
                children: <SideNavLink href="/new/verify">Verify</SideNavLink>,
                href: "/new/verify",
                icon: <InkIcon.CheckFill size="icon-lg" enforce="inherit" />,
              },
            ]
          : []),
        {
          asChild: true,
          children: <SideNavLink href="/new/builders">Build</SideNavLink>,
          href: "/new/builders",
          icon: <BuildersBulletIcon size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/new/community">Community</SideNavLink>,
          href: "/new/community",
          icon: <InkIcon.Profile size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/new/about">About</SideNavLink>,
          href: "/new/about",
          icon: <AboutBulletIcon size="icon-lg" enforce="inherit" />,
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

  return (
    <Link
      {...rest}
      className={classNames(
        className,
        (exactHref ? path === hrefPath : path.startsWith(hrefPath)) &&
          "ink:text-text-on-secondary ink:bg-button-secondary"
      )}
      href={hrefObject}
    >
      {children}
    </Link>
  );
}
