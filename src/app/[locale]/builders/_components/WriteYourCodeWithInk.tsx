"use client";
import { Card, CardContent } from "@inkonchain/ink-kit";
import { useTranslations } from "next-intl";

import { ColoredText } from "@/components/ColoredText";
import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useOnWindowSize } from "@/hooks/useOnWindowSize";
import { EXTERNAL_LINKS, Link } from "@/routing";

export const WriteYourCodeWithInk = () => {
  const t = useTranslations("Landing");
  const isMainnet = useFeatureFlag("mainnet");

  const isMobile = useOnWindowSize({ size: "sm" });

  return (
    <Card
      image={
        <CardContent.Image>
          <ParallaxedHoverImage
            src={isMobile ? "/mobile-builder.webp" : "/builder.webp"}
            width={2048}
            height={2048}
            alt="ink"
          />
        </CardContent.Image>
      }
      imageLocation="left"
    >
      <CardContent.TitleAndDescription
        title={
          <ColoredText className="ink:text-h3" variant="purple">
            Write your code with Ink
          </ColoredText>
        }
        description={
          <div className="flex flex-col gap-4">
            <p>
              The next chapter of DeFi will be written with Ink. Ink is the
              bridge between users and the builders shaping DeFi. Powered by the
              Superchain and fortified by over a decade of crypto expertise,
              this is where visionary builders turn code into financial
              revolutions.
            </p>
            <p>
              Our commitment to builders: Ink will provide you with a
              world-class development environment, complete with the tools,
              support, and users you need to bring your ideas to life.
            </p>
            <p>
              {isMainnet ? (
                <>
                  Ink mainnet has now been unleashed! To stay updated, join
                  below.
                </>
              ) : (
                <>
                  Ink&apos;s testnet will be released soon. To stay updated,
                  join below.
                </>
              )}
            </p>
          </div>
        }
      />
      <CardContent.LargeLinks>
        <CardContent.LargeLink asChild>
          <Link
            href={EXTERNAL_LINKS.inkKit}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ink Kit
          </Link>
        </CardContent.LargeLink>
        <CardContent.LargeLink asChild>
          <Link
            href={EXTERNAL_LINKS.documentation}
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </Link>
        </CardContent.LargeLink>
        <CardContent.LargeLink asChild>
          <Link
            href={EXTERNAL_LINKS.status}
            target="_blank"
            rel="noopener noreferrer"
          >
            Status
          </Link>
        </CardContent.LargeLink>
        <CardContent.LargeLink asChild>
          <Link
            href={
              isMainnet
                ? EXTERNAL_LINKS.mainnetExplorerBlockscout
                : EXTERNAL_LINKS.testnetExplorerBlockscout
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorer
          </Link>
        </CardContent.LargeLink>
        <CardContent.LargeLink asChild>
          <Link href="/faucet" rel="noopener noreferrer">
            Testnet Faucet
          </Link>
        </CardContent.LargeLink>
        <CardContent.LargeLink asChild>
          <Link
            href={EXTERNAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </CardContent.LargeLink>
        {!isMainnet && (
          <CardContent.LargeLink asChild>
            <Link href="/testnet-bridge" rel="noopener noreferrer">
              Bridge
            </Link>
          </CardContent.LargeLink>
        )}
      </CardContent.LargeLinks>
    </Card>
  );
};
