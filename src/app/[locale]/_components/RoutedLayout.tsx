import { Suspense } from "react";
import { InkLayout } from "@inkonchain/ink-kit";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";

import { InkLogo, InkLogoImage } from "./InkLogo";
import { MobileNav } from "./MobileNav";
import { SideNav } from "./SideNav";

export function RoutedLayout({ children }: { children: React.ReactNode }) {
  return (
    <InkLayout
      mainIcon={
        <Suspense fallback={<InkLogoImage />}>
          <InkLogo />
        </Suspense>
      }
      headerContent={<ConnectWalletButton shrinkOnMobile />}
      mobileNavigation={<MobileNav />}
      sideNavigation={<SideNav />}
    >
      {children}
    </InkLayout>
  );
}
