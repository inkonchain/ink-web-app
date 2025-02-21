"use client";

import Image from "next/image";

import { ColoredText } from "@/components/ColoredText";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { EXTERNAL_LINKS } from "@/routing";

import { PartnerCard } from "./PartnerCard";

export function PartnerCards() {
  return (
    <div className="flex flex-col gap-6">
      <FlyWhenIntoView className="flex flex-col items-start gap-6 sm:gap-16">
        <ColoredText className="ink:text-h3" variant="purple">
          <h2>Unleashed by Kraken</h2>
        </ColoredText>
      </FlyWhenIntoView>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <PartnerCard
            url={EXTERNAL_LINKS.optimism}
            image={
              <Image
                className="object-contain w-[160px] aspect-square"
                src="/icons/op.svg"
                width={160}
                height={160}
                alt="op"
                loading="eager"
              />
            }
            heading="Built on the Superchain"
            text="Built on the OP stack, one of the most trusted, scalable, and interoperable blockchains. Selected due to their commitment to building a better decentralized future for everyone."
          />
          <PartnerCard
            url={EXTERNAL_LINKS.kraken}
            image={
              <Image
                className="object-contain h-[60px]"
                src="/icons/kraken.svg"
                width={512}
                height={512}
                alt="kraken logo"
                loading="eager"
              />
            }
            heading="From the team behind Kraken"
            text="A market-leading exchange built on trust, experience and innovation with over 10 million users. One of the key voices in taking crypto to the world over the last 10+ years."
          />
        </div>
      </div>
    </div>
  );
}
