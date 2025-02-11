"use client";

import { Suspense } from "react";
import { ConnectWallet, InkLayout } from "@inkonchain/ink-kit";

import { InkLogo, InkLogoImage } from "../../_components/InkLogo";
import { MobileNav } from "../../_components/MobileNav";
import { SideNav } from "../../_components/SideNav";

export function RoutedLayout({ children }: { children: React.ReactNode }) {
  return (
    <InkLayout
      mainIcon={
        <Suspense fallback={<InkLogoImage />}>
          <InkLogo />
        </Suspense>
      }
      headerContent={<ConnectWallet />}
      mobileNavigation={MobileNav}
      sideNavigation={<SideNav />}
    >
      {children}
    </InkLayout>
  );
}
