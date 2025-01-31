import { Footer } from "@/components/Footer";
import { routing } from "@/routing";

import { HomeHeader } from "../_components/HomeHeader";
import { HomeShortcuts } from "../(home)/HomeShortcuts";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeHeader />
      <HomeShortcuts />

      <div className="flex-1 relative pb-24 pt-32 container mx-auto">
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
