"use client";

import { Suspense } from "react";
import { InkLayout } from "@inkonchain/ink-kit";

import { ConnectWalletButton } from "@/app/[locale]/_components/ConnectWalletButton";

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
      headerContent={<ConnectWalletButton shrinkOnMobile />}
      mobileNavigation={MobileNav}
      sideNavigation={<SideNav />}
    >
      {children}
    </InkLayout>
  );
}
