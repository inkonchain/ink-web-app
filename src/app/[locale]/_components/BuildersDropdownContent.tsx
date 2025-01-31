import { HTMLAttributeAnchorTarget } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ArrowRightIcon } from "@/components/icons/ArrowRight";
import { CommunityBulletIcon } from "@/components/icons/bullets/Community";
import { DocsBulletIcon } from "@/components/icons/bullets/Docs";
import { FaucetBulletIcon } from "@/components/icons/bullets/Faucet";
import { GitHubBulletIcon } from "@/components/icons/bullets/GitHub";
import { StatusBulletIcon } from "@/components/icons/bullets/Status";
import { TestnetBulletIcon } from "@/components/icons/bullets/Testnet";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { EXTERNAL_LINKS, HrefProp, Link } from "@/routing";

export const BuildersDropdownContent = () => {
  const query = useRouterQuery();
  const isMainnet = useFeatureFlag("mainnet");
  const t = useTranslations("Menu");

  return (
    <div className="mt-2 bg-[#f1f2f9] dark:bg-softDarkPurple rounded-3xl shadow-lg py-5 px-5 flex">
      <div className="flex gap-8 w-full">
        {/* Left side - Links */}
        <div className="flex flex-col gap-2">
          <BuildersLink
            icon={<DocsBulletIcon className="shrink-0" size="icon-lg" />}
            label={t("documentation")}
            href={EXTERNAL_LINKS.documentation}
            target="_blank"
          />
          <BuildersLink
            icon={<GitHubBulletIcon className="shrink-0" size="icon-lg" />}
            label={t("inkkit")}
            href={EXTERNAL_LINKS.inkKit}
            target="_blank"
          />
          <BuildersLink
            icon={<StatusBulletIcon className="shrink-0" size="icon-lg" />}
            label={t("statusPage")}
            href={EXTERNAL_LINKS.status}
            target="_blank"
          />
          <BuildersLink
            icon={<TestnetBulletIcon className="shrink-0" size="icon-lg" />}
            label={t("explorer")}
            href={
              isMainnet
                ? EXTERNAL_LINKS.mainnetExplorerBlockscout
                : EXTERNAL_LINKS.testnetExplorerBlockscout
            }
            target="_blank"
          />
          <div className="ml-6">
            {isMainnet ? (
              <>
                <BuildersLink
                  icon={
                    <Image
                      src="/icons/blockscout.jpg"
                      width={23}
                      height={23}
                      alt="Explorer"
                      className="inline rounded-full"
                    />
                  }
                  label={t("blockscout")}
                  href={EXTERNAL_LINKS.mainnetExplorerBlockscout}
                  target="_blank"
                />
                <BuildersLink
                  icon={
                    <Image
                      src="/icons/okxexplorer.jpg"
                      width={23}
                      height={23}
                      alt="Explorer"
                      className="inline rounded-full"
                    />
                  }
                  label={t("okx")}
                  href={EXTERNAL_LINKS.mainnetExplorerOkx}
                  target="_blank"
                />
              </>
            ) : (
              <>
                <BuildersLink
                  icon={
                    <TestnetBulletIcon className="shrink-0" size="icon-lg" />
                  }
                  label={t("blockscout")}
                  href={EXTERNAL_LINKS.testnetExplorerBlockscout}
                  target="_blank"
                />
                <BuildersLink
                  icon={
                    <TestnetBulletIcon className="shrink-0" size="icon-lg" />
                  }
                  label={t("routescan")}
                  href={EXTERNAL_LINKS.testnetExplorerRoutescan}
                  target="_blank"
                />
              </>
            )}
          </div>
          <BuildersLink
            icon={<FaucetBulletIcon className="shrink-0" size="icon-lg" />}
            label={t("testnetFaucet")}
            href={{
              pathname: "/faucet",
              query: query,
            }}
            target="_blank"
          />
          <BuildersLink
            icon={<CommunityBulletIcon className="shrink-0" size="icon-lg" />}
            label={t("community")}
            href={{
              pathname: "/community",
              query: query,
            }}
          />
          <BuildersLink
            icon={<GitHubBulletIcon className="shrink-0" size="icon-lg" />}
            label={t("github")}
            href={{
              pathname: "https://github.com/inkonchain",
            }}
            target="_blank"
          />
        </div>

        {/* Right side - Image */}
        <div className="w-[250px] h-full overflow-hidden rounded-2xl">
          <ParallaxedHoverImage
            src="/nav-chad.png"
            alt="Navigation illustration"
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

interface BuildersLinkProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  href: HrefProp;
  target?: HTMLAttributeAnchorTarget;
}

const BuildersLink = ({ icon, label, href, target }: BuildersLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 hover:bg-blackMagic/5 hover:dark:bg-whiteMagic/10 py-2 px-6 -mx-4 rounded-4xl font-bold uppercase group"
      target={target}
    >
      {icon}
      <div className="flex items-center justify-between w-full gap-4">
        {label}
        <ArrowRightIcon
          size="icon-sm"
          className="opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 duration-200 transition-opacity"
        />
      </div>
    </Link>
  );
};
