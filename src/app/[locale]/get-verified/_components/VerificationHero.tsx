"use client";

import Image from "next/image";

import { Button } from "@/components/Button/Button";
import { ColoredText } from "@/components/ColoredText";
import { useVerificationModalContext } from "@/components/VerificationModal/VerificationModalContext";
import { classNames } from "@/util/classes";

export function VerificationHero() {
  const { setIsOpen } = useVerificationModalContext();

  return (
    <div className="flex flex-col items-center gap-8 flex-1 pt-8 sm:pt-0 sm:min-h-[85vh] sm:justify-center">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-16 w-full max-w-6xl mx-auto">
        {/* Left side - Image */}
        <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] shrink-0">
          <Image
            src="/devcon-ink-devjam-get-verified.png"
            alt="Ink DevJam Verification"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col items-center sm:items-start gap-6 flex-1">
          <ColoredText
            noisy
            variant="reverse-purple"
            className="font-medium antialiased"
            pulse="md"
          >
            <div
              className={classNames(
                "text-[32px] sm:text-[56px]",
                "leading-tight",
                "text-center sm:text-left"
              )}
            >
              Get Verified onchain to unlock perks and dev tools
            </div>
          </ColoredText>

          <div className="text-lg sm:text-xl text-center sm:text-left text-gray-600 dark:text-gray-300 max-w-2xl">
            Simply verify your attendance of the Ink DevJam event and
            you&apos;re golden!
          </div>

          <div>
            <Button
              variant="primary"
              size="lg"
              className="font-bold text-lg mt-4 px-16"
              onClick={() => setIsOpen(true)}
            >
              Verify now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
