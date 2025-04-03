"use client";

import { useTranslations } from "next-intl";
import { Button } from "@inkonchain/ink-kit";
import { Link } from "@/routing";

import { ColoredText } from "@/components/ColoredText";

export function VerifyLearnMore() {
  const t = useTranslations("Verify.learnMore");

  return (
    <div className="flex flex-col items-center gap-6 text-center px-4">
      <ColoredText
        className="text-2xl sm:text-3xl font-medium"
        variant="purple"
        dampen="md"
      >
        {t("title")}
      </ColoredText>

      <Link href="/verify/faq">
        <Button variant="secondary" size="md">
          {t("cta")}
        </Button>
      </Link>
    </div>
  );
}
