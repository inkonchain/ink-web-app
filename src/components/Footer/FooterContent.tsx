import Image from "next/image";

import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { SocialLinksRow } from "@/components/SocialLinksRow";
import { TextUnderline } from "@/components/TextUnderline";
import { EXTERNAL_LINKS, Link } from "@/routing";
import { classNames } from "@/util/classes";

import { CookieSettingsButton } from "../../app/[locale]/_components/CookieSettingsButton";

interface FooterContentProps {
  enforce?: "black";
}

export const FooterContent: React.FC<FooterContentProps> = ({ enforce }) => (
  <div className="flex-1 flex items-center justify-center gap-6 xl:flex-row xl:justify-between flex-wrap text-footer">
    <div className="flex gap-6 items-center justify-center flex-wrap">
      <div className="flex gap-6 items-center justify-center flex-wrap">
        <Link
          href={EXTERNAL_LINKS.superchain}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/Built_on_Superchain@2x.svg"
            width={167}
            height={30}
            alt="Superchain"
            className={classNames(
              "h-[30px] w-auto",
              enforce === "black" ? "" : "dark:invert"
            )}
          />
        </Link>

        <Link
          href={EXTERNAL_LINKS.ethereum}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/Secured_by_Ethereum@2x.svg"
            width={167}
            height={30}
            alt="Ethereum"
            className={classNames(
              "h-[30px] w-auto",
              enforce === "black" ? "" : "dark:invert"
            )}
          />
        </Link>

        <Link
          href={EXTERNAL_LINKS.kraken}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/Unleashed_by_Kraken@2x.svg"
            width={167}
            height={30}
            alt="Kraken"
            className={classNames(
              "h-[30px] w-auto",
              enforce === "black" ? "" : "dark:invert"
            )}
          />
        </Link>
      </div>
    </div>

    <div className="order-first sm:order-none">
      <SocialLinksRow />
    </div>

    <div className={classNames("block sm:hidden", "order-2")}>
      <OnlyWithFeatureFlag
        flag="mainnet"
        otherwise={<span>© 2024 Ink Limited</span>}
      >
        © 2024 Ink Foundation
      </OnlyWithFeatureFlag>
    </div>

    <div className="flex sm:gap-6 gap-4 flex-wrap justify-center">
      <div className="hidden sm:block">
        <OnlyWithFeatureFlag
          flag="mainnet"
          otherwise={<span>© 2024 Ink Limited</span>}
        >
          © 2024 Ink Foundation
        </OnlyWithFeatureFlag>
      </div>

      <Link className="group relative" href="/terms">
        Terms of Service
        <TextUnderline halfOpacity enforce={enforce} />
      </Link>

      <Link className="group relative" href="/privacy">
        Privacy Notice
        <TextUnderline halfOpacity enforce={enforce} />
      </Link>

      <CookieSettingsButton enforce={enforce} />
    </div>
  </div>
);
