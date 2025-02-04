"use client";

import { InkIcon, InkLayoutSideNav } from "@inkonchain/ink-kit";

import { AppsIcon } from "@/components/icons/Apps";
import { BridgeIcon } from "@/components/icons/Bridge";
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
  const path = usePathname();
  const hasVerifyPage = useFeatureFlag("verifyPage");

  if (path === "/new") {
    return false;
  }

  return (
    <InkLayoutSideNav
      links={[
        {
          asChild: true,
          children: <SideNavLink href="/new/dashboard">Apps</SideNavLink>,
          href: "/new/dashboard",
          icon: <AppsIcon size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/new/bridge">Bridge</SideNavLink>,
          href: "/new/bridge",
          icon: <BridgeIcon size="icon-lg" enforce="inherit" />,
        },
        {
          asChild: true,
          children: <SideNavLink href="/new/community">Community</SideNavLink>,
          href: "/new/community",
          icon: <InkIcon.Profile size="icon-lg" enforce="inherit" />,
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
      ]}
    />
  );
};

function SideNavLink({
  className,
  href,
  children,
  ...rest
}: {
  className?: string;
  href: HrefProp;
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
        path.startsWith(hrefPath) &&
          "ink:text-text-on-secondary ink:bg-button-secondary"
      )}
      href={hrefObject}
    >
      {children}
    </Link>
  );
}
