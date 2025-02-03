"use client";

import { Suspense } from "react";
import { ConnectWallet, InkLayout } from "@inkonchain/ink-kit";
import { usePathname } from "next/navigation";

import { InkLogo, InkLogoImage } from "../../_components/InkLogo";
import { MobileNav } from "../../_components/MobileNav";
import { SideNav } from "../../_components/SideNav";
import { TopNav } from "../../_components/TopNav";

export function RoutedLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <InkLayout
      mainIcon={
        <Suspense fallback={<InkLogoImage />}>
          <InkLogo />
        </Suspense>
      }
      headerContent={<ConnectWallet />}
      topNavigation={path === "/new" ? <TopNav /> : undefined}
      mobileNavigation={MobileNav}
      sideNavigation={path === "/new" ? undefined : <SideNav />}
    >
      {children}
    </InkLayout>
  );
}
