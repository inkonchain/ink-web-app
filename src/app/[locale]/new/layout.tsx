import { Suspense } from "react";
import { ConnectWallet, InkLayout } from "@inkonchain/ink-kit";

import { Footer } from "@/components/Footer";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { routing } from "@/routing";

import { InkLogo, InkLogoImage } from "./_components/InkLogo";
import { MainPageBackground } from "./_components/MainPageBackground";
import { MobileNav } from "./_components/MobileNav";
import { TopNav } from "./_components/TopNav";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnlyWithFeatureFlag flag="newNav">
      <InkLayout
        mainIcon={
          <Suspense fallback={<InkLogoImage />}>
            <InkLogo />
          </Suspense>
        }
        headerContent={<ConnectWallet />}
        topNavigation={<TopNav />}
        mobileNavigation={MobileNav}
      >
        <div className="flex-1 relative pt-24 sm:pt-0 sm:pb-12 pb-48">
          <div className="flex flex-col">{children}</div>
          <div>
            <Footer />
          </div>
        </div>
      </InkLayout>
      <MainPageBackground />
    </OnlyWithFeatureFlag>
  );
}
