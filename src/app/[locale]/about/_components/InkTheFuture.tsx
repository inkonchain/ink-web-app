"use client";

import { Card, CardContent } from "@inkonchain/ink-kit";

import { ColoredText } from "@/components/ColoredText";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";

export function InkTheFuture() {
  return (
    <Card
      imageLocation="left"
      size="noPadding"
      image={
        <CardContent.Image>
          <ParallaxedHoverImage
            src="/ink-the-future.png"
            className="scale-150 object-[0px_80px] rotate-180 sm:object-[-80px_80px] sm:rotate-0 sm:scale-125"
            width={400}
            height={400}
            alt="an inky blob"
            blendMode="hard-light"
          />
        </CardContent.Image>
      }
    >
      <CardContent.TitleAndDescription
        title={<ColoredText variant="purple">Ink the future</ColoredText>}
        description={
          <div className="flex flex-col ink:text-text-default">
            Kraken unleashed Ink, a new L2 blockchain secured by the Ethereum
            network and built on the Superchain, on October 24th, 2024.
            Kraken&apos;s mission has always been to accelerate the adoption of
            crypto globally so everyone can achieve financial freedom; Ink is a
            critical step in doing that.
            <br />
            <br />
            <span className="ink:text-body-2-regular ink:text-text-muted">
              &mdash; Andrew Koller, Ink Founder
            </span>
          </div>
        }
      />
    </Card>
  );
}
