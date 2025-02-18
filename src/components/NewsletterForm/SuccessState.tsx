"use client";

import Image from "next/image";

import { ButtonLink } from "@/components/Button/ButtonLink";
import { TwitterIcon } from "@/components/icons/Twitter";
import { MagneticHoverEffect } from "@/components/MagneticHoverEffect";
import { EXTERNAL_LINKS } from "@/routing";

interface SuccessStateProps {}

export const SuccessState: React.FC<SuccessStateProps> = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src="/wallet-sign-check.png"
        width={240}
        height={240}
        alt="wallet sign check"
      ></Image>

      <h3 className="text-4xl">Welcome, thanks for joining Ink</h3>

      <span className="text-xl">
        Share the announcement of Ink with your community
      </span>

      <MagneticHoverEffect>
        <ButtonLink
          href={EXTERNAL_LINKS.twitterShareLink}
          aria-label="Discord"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          variant="primary"
          icon={<TwitterIcon size="icon-xl" enforce="white" />}
        >
          SHARE ON X
        </ButtonLink>
      </MagneticHoverEffect>
    </div>
  );
};
