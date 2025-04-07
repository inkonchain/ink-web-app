"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/routing";

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

export default function FAQPage() {
  const t = useTranslations("Verify");

  const faqItems: FAQItem[] = FAQ_KEYS.map((id) => ({
    id,
    title: t(`faq.${id}.title`),
    description: t.rich(`faq.${id}.description`, {
      "eas-link": (chunks) => (
        <Link
          href="https://docs.attest.org/docs/welcome"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {chunks}
        </Link>
      ),
    }),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-medium mb-8">{t("faq.title")}</h2>
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
