import Image from "next/image";

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

      <div className="absolute -top-0 -right-0 z-[-1] dark:mix-blend-hard-light max-w-[400px] max-h-[400px] xl:max-w-[800px] xl:max-h-[800px] overflow-hidden">
        <Image
          className="dark:mix-blend-hard-light w-full h-full ml-10 -mt-10"
          src="/verify-blob.png"
          alt="Verify"
          width={800}
          height={800}
        />
      </div>

      <div className="flex-1 relative pb-24 pt-32 container mx-auto">
        <div className="flex flex-col">{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
