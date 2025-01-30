"use client";

import React, { useRef } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";

import { ArrowOnHover } from "@/components/ArrowOnHover";
import { Header } from "@/components/Header";
import { KeyboardShortcut } from "@/components/KeyboardShortcut";
import { PillContainer } from "@/components/PillContainer";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { BuildersDropdownContent } from "./BuildersDropdownContent";
import { ContactUsHeaderButton } from "./ContactUsHeaderButton";
import { MobileNavItems } from "./MobileNavItems";

export const HomeHeader = () => {
  const searchParams = useRouterQuery();
  const isMainnet = useFeatureFlag("mainnet");
  const linkClasses =
    "px-2.5 py-2 group text-center flex items-center gap-1 dark:opacity-75 rounded-4xl uppercase";
  const t = useTranslations("Menu");

  return (
    <Header mobileChildren={<MobileNavItems />}>
      <PillContainer className="PillContainer hidden mx-auto w-fit font-bold sm:flex items-center justify-center px-3 py-1 shadow-none">
        <Link
          className={`${linkClasses} `}
          href={{ pathname: "/", hash: "about", query: searchParams }}
        >
          {t("about")}
          <ArrowOnHover />
          <KeyboardShortcut letter="A" opacity="light" size="sm" />
        </Link>
        <Link
          className={`${linkClasses} `}
          href={
            isMainnet
              ? {
                  pathname: "/dashboard",
                  query: {
                    ...Object.fromEntries(
                      new URLSearchParams(searchParams) || {}
                    ),
                    category: "bridge",
                  },
                }
              : { pathname: "/testnet-bridge", query: searchParams }
          }
        >
          {t("bridge")}
          <ArrowOnHover />
          <KeyboardShortcut letter="B" opacity="light" size="sm" />
        </Link>
        <BuildersLinkWithPopover
          linkClasses={linkClasses}
          searchParams={searchParams}
        />

        <Link
          className={`${linkClasses}`}
          href={{
            pathname: "/community",
            query: searchParams,
          }}
        >
          {t("community")}
          <ArrowOnHover />
          <KeyboardShortcut letter="H" opacity="light" size="sm" />
        </Link>
        <ContactUsHeaderButton className={linkClasses} />
      </PillContainer>
    </Header>
  );
};

const BuildersLinkWithPopover: React.FC<{
  linkClasses: string;
  searchParams: string;
}> = ({ linkClasses, searchParams }) => {
  const t = useTranslations("Menu");
  const ref = useRef<HTMLButtonElement | null>(null);

  const togglePopover = (button: HTMLButtonElement) => {
    if (button) {
      const active = document.activeElement;
      button.click();
      button.blur();
      if (active instanceof HTMLElement) {
        active.focus();
      }
    }
  };

  return (
    <Popover>
      {({ open }) => (
        <>
          <Link
            className={`${linkClasses} group/builders`}
            href={{
              pathname: "/",
              hash: "builders",
              query: searchParams,
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
              if (!open && ref.current) {
                togglePopover(ref.current);
              }
            }}
          >
            {t("builders")}
            <PopoverButton ref={ref} className="group flex">
              <ArrowOnHover iconClassName="rotate-90" />
            </PopoverButton>
            <KeyboardShortcut letter="D" opacity="light" size="sm" />
          </Link>
          <PopoverPanel
            className="z-50"
            anchor={{ to: "top", gap: 8 }}
            onMouseLeave={() => {
              if (open && ref.current) {
                togglePopover(ref.current);
              }
            }}
          >
            <BuildersDropdownContent />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
