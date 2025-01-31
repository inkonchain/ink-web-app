"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { useContactUsModalContext } from "@/components/ContactUsModal/ContactUsModalContext";
import { ArrowRightIcon } from "@/components/icons/ArrowRight";
import { AboutBulletIcon } from "@/components/icons/bullets/About";
import { BridgeBulletIcon } from "@/components/icons/bullets/Bridge";
import { BuildersBulletIcon } from "@/components/icons/bullets/Builders";
import { CommunityBulletIcon } from "@/components/icons/bullets/Community";
import { ContactBulletIcon } from "@/components/icons/bullets/Contact";
import { DocsBulletIcon } from "@/components/icons/bullets/Docs";
import { FaucetBulletIcon } from "@/components/icons/bullets/Faucet";
import { GitHubBulletIcon } from "@/components/icons/bullets/GitHub";
import { StatusBulletIcon } from "@/components/icons/bullets/Status";
import { TestnetBulletIcon } from "@/components/icons/bullets/Testnet";
import { useMobileMenuContext } from "@/components/MobileMenu/MobileMenuContext";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { EXTERNAL_LINKS, Link } from "@/routing";

export const MobileNavItems = () => {
  const { setIsOpen } = useMobileMenuContext();
  const { setIsOpen: setIsContactUsModalOpen } = useContactUsModalContext();
  const query = useRouterQuery();
  const isMainnet = useFeatureFlag("mainnet");
  const t = useTranslations("Menu");

  const linkClasses = "flex items-center gap-4 flex-1 uppercase";

  return (
    <div className="max-h-[100vh] overflow-y-auto">
      <MobileNavRow>
        <Link
          className={linkClasses}
          href={{ pathname: "/", hash: "about", query: query }}
          onClick={() => setIsOpen(false)}
        >
          <MobileNavContent>
            <AboutBulletIcon size="icon-lg" />
            {t("about")}
          </MobileNavContent>
        </Link>
      </MobileNavRow>
      <MobileNavRow>
        <Link
          className={linkClasses}
          href={{
            pathname: "/dashboard",
            query: {
              ...Object.fromEntries(new URLSearchParams(query) || {}),
              category: "bridge",
            },
          }}
          onClick={() => setIsOpen(false)}
        >
          <MobileNavContent>
            <BridgeBulletIcon size="icon-lg" />
            {t("bridge")}
          </MobileNavContent>
        </Link>
      </MobileNavRow>
      <MobileNavRow>
        <Link
          className={linkClasses}
          href={{ pathname: "/", hash: "builders", query: query }}
          onClick={() => setIsOpen(false)}
        >
          <MobileNavContent>
            <BuildersBulletIcon size="icon-lg" />
            {t("builders")}
          </MobileNavContent>
        </Link>
      </MobileNavRow>
      <div className="ml-10">
        <MobileNavRow>
          <Link
            className={linkClasses}
            href={EXTERNAL_LINKS.documentation}
            target="_blank"
            onClick={() => setIsOpen(false)}
          >
            <MobileNavContent>
              <DocsBulletIcon size="icon-lg" />
              {t("documentation")}
            </MobileNavContent>
          </Link>
        </MobileNavRow>
        <MobileNavRow>
          <Link
            className={linkClasses}
            href={EXTERNAL_LINKS.inkKit}
            target="_blank"
            onClick={() => setIsOpen(false)}
          >
            <MobileNavContent>
              <GitHubBulletIcon size="icon-lg" />
              {t("inkkit")}
            </MobileNavContent>
          </Link>
        </MobileNavRow>
        <MobileNavRow>
          <Link
            className={linkClasses}
            href={{ pathname: "/faucet", query: query }}
            onClick={() => setIsOpen(false)}
          >
            <MobileNavContent>
              <FaucetBulletIcon size="icon-lg" />
              {t("testnetFaucet")}
            </MobileNavContent>
          </Link>
        </MobileNavRow>
        <MobileNavRow>
          <Link
            className={linkClasses}
            href={EXTERNAL_LINKS.status}
            target="_blank"
            onClick={() => setIsOpen(false)}
          >
            <MobileNavContent>
              <StatusBulletIcon size="icon-lg" />
              {t("statusPage")}
            </MobileNavContent>
          </Link>
        </MobileNavRow>
        <MobileNavRow>
          <Link
            className={linkClasses}
            href={
              isMainnet
                ? EXTERNAL_LINKS.mainnetExplorerBlockscout
                : EXTERNAL_LINKS.testnetExplorerBlockscout
            }
            target="_blank"
            onClick={() => setIsOpen(false)}
          >
            <MobileNavContent>
              <TestnetBulletIcon size="icon-lg" />
              {t("explorer")}
            </MobileNavContent>
          </Link>
        </MobileNavRow>
        <div className="ml-10">
          <MobileNavRow>
            <Link
              className={linkClasses}
              href={
                isMainnet
                  ? EXTERNAL_LINKS.mainnetExplorerBlockscout
                  : EXTERNAL_LINKS.testnetExplorerBlockscout
              }
              target="_blank"
              onClick={() => setIsOpen(false)}
            >
              <MobileNavContent>
                <Image
                  src="/icons/blockscout.jpg"
                  width={23}
                  height={23}
                  alt="Explorer"
                  className="rounded-full"
                />
                {t("blockscout")}
              </MobileNavContent>
            </Link>
          </MobileNavRow>
          <MobileNavRow>
            <Link
              className={linkClasses}
              href={
                isMainnet
                  ? EXTERNAL_LINKS.mainnetExplorerOkx
                  : EXTERNAL_LINKS.testnetExplorerOkx
              }
              target="_blank"
              onClick={() => setIsOpen(false)}
            >
              <MobileNavContent>
                <Image
                  src="/icons/okxexplorer.jpg"
                  width={23}
                  height={23}
                  alt="Explorer"
                  className="rounded-full"
                />
                {t("okx")}
              </MobileNavContent>
            </Link>
          </MobileNavRow>
        </div>
      </div>

      <MobileNavRow>
        <Link
          className={linkClasses}
          href={{ pathname: "/community", query: query }}
          onClick={() => setIsOpen(false)}
        >
          <MobileNavContent>
            <CommunityBulletIcon size="icon-lg" />
            {t("community")}
          </MobileNavContent>
        </Link>
      </MobileNavRow>
      <MobileNavRow>
        <button
          className={linkClasses}
          onClick={() => {
            setIsContactUsModalOpen(true);
            setIsOpen(false);
          }}
        >
          <MobileNavContent>
            <div className="flex items-center gap-4">
              <ContactBulletIcon size="icon-lg" />
              {t("contact")}
            </div>
          </MobileNavContent>
        </button>
      </MobileNavRow>
    </div>
  );
};

const MobileNavRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between w-full pl-6 my-4 -mx-4 rounded-4xl font-bold uppercase text-blackMagic hover:text-blackMagic/50 dark:text-whiteMagic dark:hover:text-whiteMagic/50">
    {children}
  </div>
);

const MobileNavContent = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex items-center gap-4 flex-1">{children}</div>
    <ArrowRightIcon size="icon-md" />
  </>
);
