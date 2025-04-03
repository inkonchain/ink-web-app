"use client";

import { useTranslations } from "next-intl";

const FAQ_ITEMS = [
  "whatIsVerify",
  "whatGoesOnchain",
  "payforGas",
  "numberofAddresses",
  "howManyTimes",
  "howDoesitWork",
  "transferable",
  "support",
] as const;

type FAQItemId = (typeof FAQ_ITEMS)[number];

type FAQItem = {
  id: FAQItemId;
  title: string;
  description: string;
};

const parseDescription = (description: string) => {
  const parts = description.split(/(<link>.*?<\/link>)/g);
  return parts.map((part, index) => {
    if (part.startsWith("<link>") && part.endsWith("</link>")) {
      const text = part.replace(/<\/?link>/g, "");
      return (
        <a
          key={index}
          href="https://docs.attest.org/docs/welcome"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default function FAQPage() {
  const faqT = useTranslations("Verify.faq");
  const faqTRaw = useTranslations("Verify.faq");

  const faqItems: FAQItem[] = FAQ_ITEMS.map((id) => ({
    id,
    title: faqT(`${id}.title`),
    description: faqTRaw.raw(`${id}.description`),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="w-full max-w-4xl mt-12">
        <h2 className="text-2xl font-medium mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.id} className="text-left">
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-blackMagic/50 dark:text-whiteMagic/50">
                {parseDescription(item.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
