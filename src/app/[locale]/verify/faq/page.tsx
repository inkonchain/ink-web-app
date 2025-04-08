"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Link, HrefProp } from "@/routing";
import { ColoredText } from "@/components/ColoredText";

const FAQ_KEYS = [
  "whatIsVerify",
  "whyVerify",
  "whatGoesOnchain",
  "payforGas",
  "numberofAddresses",
  "howDoesitWork",
  "wherecaniView",
  "transferable",
  "wrongAddress",
  "support",
  "devSupport",
] as const;

type FAQItem = {
  id: (typeof FAQ_KEYS)[number];
  title: string;
  description: ReactNode;
};

const ExternalLink: React.FC<{
  href: HrefProp;
  children: ReactNode;
}> = ({ href, children }) => (
  <Link
    href={href}
    className="text-primary underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Link>
);

ExternalLink.displayName = "ExternalLink";

export default function FAQPage() {
  const t = useTranslations("Verify");

  const faqItems: FAQItem[] = FAQ_KEYS.map((id) => ({
    id,
    title: t(`faq.${id}.title`),
    description: t.rich(`faq.${id}.description`, {
      "eas-link": (chunks) => (
        <ExternalLink href="https://docs.attest.org/docs/welcome">
          {chunks}
        </ExternalLink>
      ),
      "support-link": (chunks) => (
        <ExternalLink href="https://support.kraken.com/hc/en-us/articles/kraken-verify">
          {chunks}
        </ExternalLink>
      ),
      "docs-link": (chunks) => (
        <ExternalLink href="https://docs.inkonchain.com/build/verify">
          {chunks}
        </ExternalLink>
      ),
    }),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="w-full max-w-4xl mb-12 space-y-12">
        <ColoredText variant="purple" className="text-6xl">
          {t("faq.title")}
        </ColoredText>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.id} className="text-left">
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-blackMagic/50 dark:text-whiteMagic/50">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
