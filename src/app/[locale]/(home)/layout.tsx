import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Footer } from "@/components/Footer";
import { MainBackground } from "@/components/MainBackground/MainBackground";
import { routing } from "@/routing";
import { getFeatureFlags } from "@/util/feature-flags";

import { HomeHeader } from "../_components/HomeHeader";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const featureFlags = await getFeatureFlags();
  const morpheus = featureFlags.morpheus;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HomeHeader />
      <div className="flex-1 relative pt-24 sm:pt-0 sm:pb-12 pb-48 flex flex-col gap-4">
        <div>{children}</div>
        <div>
          <Footer />
        </div>
      </div>
      <MainBackground type={morpheus ? "3d" : "video"} />
    </NextIntlClientProvider>
  );
}
