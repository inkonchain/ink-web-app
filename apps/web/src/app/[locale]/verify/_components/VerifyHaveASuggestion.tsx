"use client";

import { Button } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";

import { ColoredText } from "@/components/ColoredText";
import { useContactUsModalContext } from "@/components/ContactUsModal/ContactUsModalContext";

export function VerifyHaveASuggestion() {
  const t = useTranslations("Verify.haveASuggestion");
  const { setIsOpen } = useContactUsModalContext();

  return (
    <div className="flex flex-col items-center gap-6 text-center px-4">
      <ColoredText
        className="text-2xl sm:text-3xl font-medium"
        variant="purple"
        dampen="md"
      >
        {t("title")}
      </ColoredText>

      <div className="text-blackMagic/50 dark:text-whiteMagic/50 text-lg max-w-2xl">
        {t("description")}
      </div>

      <Button variant="secondary" size="md" onClick={() => setIsOpen(true)}>
        {t("contactTeam")}
      </Button>
    </div>
  );
}
