"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { compactLanguage, Link, routing, usePathname } from "@/routing";
import { classNames } from "@/util/classes";

import { RoundedIconButton } from "./Button/RoundedIconButton";
import { LanguageIcon } from "./icons/Language";

export const LanguageSwitcher: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  return (
    <Popover className="relative">
      <RoundedIconButton>
        <PopoverButton className="flex" as="div">
          <LanguageIcon size="icon-xl" />
        </PopoverButton>
      </RoundedIconButton>

      <PopoverPanel
        anchor={{ to: "bottom", padding: 16, gap: 4 }}
        transition
        className={classNames(
          "flex flex-col gap-1 bg-white shadow-lg rounded-lg p-2 z-10",
          "transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        )}
      >
        {routing.locales.map((cur) => (
          <Link
            className={classNames(
              "p-2 text-black hover:bg-zinc-100 rounded-lg",
              {
                "text-krakenPurple": cur === locale,
              }
            )}
            // @ts-expect-error -- Expected since the types of "params" is not computed in tanden with the "pathname", so the types don't match
            href={{ pathname, params }}
            params={params}
            key={cur}
            locale={cur}
          >
            {t("locale", { locale: compactLanguage(cur) })}
          </Link>
        ))}
      </PopoverPanel>
    </Popover>
  );
};
