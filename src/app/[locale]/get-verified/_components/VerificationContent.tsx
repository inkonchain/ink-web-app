"use client";

import Image from "next/image";

import { Button } from "@/components/Button/Button";
import { ColoredText } from "@/components/ColoredText";
import { useFeatureRequestModalContext } from "@/components/FeatureRequestModal/FeatureRequestModalContext";
import { FlyWhenIntoView } from "@/components/FlyWhenIntoView";
import { useVerificationModalContext } from "@/components/VerificationModal/VerificationModalContext";

export function VerificationContent() {
  const { setIsOpen: openVerificationModal } = useVerificationModalContext();
  const { setIsOpen: openFeatureRequestModal } =
    useFeatureRequestModalContext();

  return (
    <div className="flex flex-col gap-10 lg:gap-32 pt-16 sm:pt-32">
      {/* First section with two noisy containers */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-[1200px] mx-auto">
        <FlyWhenIntoView className="flex-1">
          <div className="flex-1 flex flex-col ink:bg-container-background ink:rounded-lg min-h-full relative shadow-[0px_3px_34px_-10px_#B4B4B466] dark:shadow-[0px_3px_34px_-10px_rgba(0,0,0,0.7)]">
            {/* Add background noise div with matching rounded corners */}
            <div
              className="absolute inset-0 opacity-50 dark:hidden mix-blend-soft-light dark:mix-blend-multiply"
              style={{
                backgroundImage: 'url("/bg/bg-noise.png")',
                backgroundRepeat: "repeat",
              }}
            />

            <div className="flex flex-col lg:flex-row gap-6 p-8 relative z-10">
              <div className="flex items-center justify-center shrink-0">
                <div className="relative w-[207px] h-[152px]">
                  <Image
                    src="/attestation.png"
                    alt="attestation"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <ColoredText
                  className="text-2xl font-medium text-center lg:text-left"
                  dampen="md"
                  variant="purple"
                >
                  What is Ink Verify?
                </ColoredText>
                <div>
                  Ink Verify is a public infrastructure that enables onchain
                  attestations about both offhcain and onchain data. Powered by
                  the Ethereum Attestation Service.
                </div>
              </div>
            </div>
          </div>
        </FlyWhenIntoView>

        <FlyWhenIntoView className="flex-1">
          <div className="flex-1 flex flex-col ink:bg-container-background ink:rounded-lg min-h-full relative shadow-[0px_3px_34px_-10px_#B4B4B466] dark:shadow-[0px_3px_34px_-10px_rgba(0,0,0,0.7)]">
            <div className="flex flex-col lg:flex-row gap-6 p-8 relative z-10">
              <div className="flex items-center justify-center shrink-0">
                <div className="relative w-[207px] h-[152px]">
                  <Image
                    src="/how-does-it-work.png"
                    alt="how it works"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <ColoredText
                  className="text-2xl font-medium text-center lg:text-left"
                  dampen="md"
                  variant="purple"
                >
                  Why Verify
                </ColoredText>
                <div>
                  We&apos;re building openly and we want to hear from you.
                  Verify your attendance, get tooling rewards, and tell us how
                  you want to use Ink Verify.
                </div>
              </div>
            </div>
          </div>
        </FlyWhenIntoView>
      </div>

      {/* Benefits section */}
      <div className="bg-softDarkPurple p-8 lg:p-16">
        <div className="flex justify-center mb-8 lg:mb-16">
          <ColoredText
            variant="purple-light"
            className="text-4xl sm:text-5xl font-medium text-center pb-2"
          >
            By verifying your attendance you can get...
          </ColoredText>
        </div>

        <div className="mb-8 lg:mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* USPs grid - 50% width */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* QuickNode */}
                <div className="bg-linear-to-b from-[#B9AAEF] to-[#9680E5] rounded-3xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src="/icons/quicknode.png"
                      width={24}
                      height={24}
                      alt="QuickNode icon"
                    />
                    <div className="text-xl font-medium text-blackMagic">
                      QuickNode
                    </div>
                  </div>
                  <div className="text-blackMagic">
                    Best in class RPC, Streams, Functions, Alerts!
                  </div>
                </div>

                {/* Tenderly */}
                <div className="bg-linear-to-b from-[#B9AAEF] to-[#9680E5] rounded-3xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src="/icons/tenderly.png"
                      width={24}
                      height={24}
                      alt="Tenderly icon"
                    />
                    <div className="text-xl font-medium text-blackMagic">
                      Tenderly
                    </div>
                  </div>
                  <div className="text-blackMagic">
                    Full stack web3 infrastructure
                  </div>
                </div>

                {/* Goldsky */}
                <div className="bg-linear-to-b from-[#B9AAEF] to-[#9680E5] rounded-3xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src="/icons/goldsky.png"
                      width={24}
                      height={24}
                      alt="Goldsky icon"
                    />
                    <div className="text-xl font-medium text-blackMagic">
                      Goldsky
                    </div>
                  </div>
                  <div className="text-blackMagic">Data indexing made easy</div>
                </div>

                {/* And more */}
                <div className="pill-gradient rounded-3xl p-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icons/more.png"
                      width={24}
                      height={24}
                      alt="More icon"
                    />
                    <ColoredText
                      variant="purple-light"
                      className="text-xl font-medium"
                    >
                      And more
                    </ColoredText>
                  </div>
                </div>
              </div>
            </div>

            {/* Discord badge - 50% width */}
            <div className="lg:w-1/2">
              <div className="bg-dapps-icon-gradient p-8 flex flex-col h-full ink:rounded-lg">
                <div className="flex justify-center">
                  <div className="relative w-[140px] h-[100px]">
                    <Image
                      src="/icons/discord-badge.png"
                      alt="Ink Discord Badge"
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </div>
                <ColoredText
                  variant="purple-dark"
                  className="text-3xl sm:text-4xl font-medium mb-4"
                >
                  Get a Discord badge
                </ColoredText>
                <div className="text-blackMagic">
                  By verifying your attendance of Ink DevJam, you&apos;ll get a
                  one of a kind Discord badge to display on your profile.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verify now button */}
        <div className="flex justify-center">
          <div className="w-[200px]">
            <Button
              variant="primary"
              size="lg"
              className="font-bold text-lg px-8"
              onClick={() => openVerificationModal(true)}
            >
              Verify now
            </Button>
          </div>
        </div>
      </div>

      {/* Request a feature section */}
      <div className="flex flex-col lg:flex-row items-center bg-krakenPurple p-8 lg:p-16 relative overflow-hidden">
        {/* Left side content */}
        <div className="flex flex-col gap-6 z-10 w-full lg:w-1/2">
          <ColoredText
            variant="white"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium"
          >
            Request a feature
          </ColoredText>
          <div className="text-lg sm:text-xl text-gray-200">
            What data would you like to see attestations for?
          </div>
          <div className="w-full sm:w-fit">
            <Button
              variant="spotlight"
              size="lg"
              className="w-full sm:w-auto font-medium text-lg bg-white text-black hover:bg-gray-100"
              onClick={() => openFeatureRequestModal(true)}
            >
              Make request
            </Button>
          </div>
        </div>

        {/* Right side image - positioned to bottom right */}
        <div className="hidden lg:block absolute right-0 bottom-0 w-1/2 h-full">
          <Image
            src="/brain-visualization.png"
            alt="Brain visualization"
            fill
            className="object-contain object-right-bottom"
            priority
          />
        </div>
      </div>

      {/* Final CTA section */}
      <FlyWhenIntoView className="flex flex-col items-center gap-6 sm:gap-16 lg:my-20 my-6 px-4">
        <ColoredText
          className="text-3xl sm:text-4xl lg:text-5xl text-center font-medium pb-2"
          variant="purple"
        >
          Get Verified and start building
        </ColoredText>

        <div>
          <Button
            variant="primary"
            size="lg"
            className="font-bold text-lg px-8"
            onClick={() => openVerificationModal(true)}
          >
            Verify now
          </Button>
        </div>
      </FlyWhenIntoView>
    </div>
  );
}
