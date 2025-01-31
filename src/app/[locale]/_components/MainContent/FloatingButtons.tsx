import Image from "next/image";

import { LanguageSwitcher } from "@/components/LocaleSwitcher";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { PillContainer } from "@/components/PillContainer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EXTERNAL_LINKS, Link } from "@/routing";

import { Disappearing } from "../../../../components/Disappearing";

import { Countdown } from "./Countdown";

export const FloatingButtons = async ({
  showCountdown = true,
  disableDisappearing = false,
  showSuperchain = true,
}: {
  showCountdown?: boolean;
  disableDisappearing?: boolean;
  showSuperchain?: boolean;
}) => {
  const scrollProps = {
    scrollMin: 300,
    scrollMax: 600,
  };
  return (
    <>
      <Disappearing
        {...scrollProps}
        className="hidden pointer-events-none xl:flex xl:pointer-events-auto absolute bottom-6 left-4 z-10 mix-blend-difference"
        disabled={disableDisappearing}
      >
        <PillContainer className="flex gap-4 px-2">
          <OnlyWithFeatureFlag flag="language">
            <LanguageSwitcher />
          </OnlyWithFeatureFlag>
          <ThemeToggle />
        </PillContainer>
      </Disappearing>
      {showSuperchain && (
        <Disappearing
          {...scrollProps}
          className="hidden pointer-events-none xl:flex xl:pointer-events-auto absolute bottom-8 right-8 items-center gap-6"
          disabled={disableDisappearing}
        >
          <div className="flex flex-col justify-end">
            <Link
              href={EXTERNAL_LINKS.superchain}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/superchain.svg"
                width={140}
                height={34}
                alt="built on the superchain"
                className="dark:invert"
              />
            </Link>
          </div>
        </Disappearing>
      )}

      <Disappearing
        {...scrollProps}
        className="absolute bottom-8 left-0 right-0 hidden sm:flex flex-col gap-6 items-center justify-center"
        disabled={disableDisappearing}
      >
        {showSuperchain && (
          <div className="flex flex-col gap-6 items-center">
            <Link
              className="xl:hidden"
              href={EXTERNAL_LINKS.superchain}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/superchain-centered.svg"
                width={140}
                height={34}
                alt="built on the superchain"
                className="dark:invert"
              />
            </Link>
          </div>
        )}
        {showCountdown && <Countdown />}
      </Disappearing>
    </>
  );
};
