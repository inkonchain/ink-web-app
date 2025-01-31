import { InkLayout } from "@inkonchain/ink-kit";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { HeaderContent } from "@/components/Header/HeaderContent";
import { LogoLink } from "@/components/LogoLink";
import { ToggleThemeShortcut } from "@/components/ToggleThemeShortcut";
import { routing } from "@/routing";

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToggleThemeShortcut />
      <InkLayout snug mainIcon={<LogoLink />} headerContent={<HeaderContent />}>
        {children}
      </InkLayout>
    </NextIntlClientProvider>
  );
}
