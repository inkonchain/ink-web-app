import { Metadata } from "next";

import { AnchorIntoView } from "@/components/AnchorIntoView";
import { FeatureRequestModal } from "@/components/FeatureRequestModal/FeatureRequestModal";
import { FeatureRequestModalProvider } from "@/components/FeatureRequestModal/FeatureRequestModalContext";
import { JsonLd } from "@/components/JsonLd";
import { PageView } from "@/components/PageView";
import { containerClasses } from "@/components/styles/container";
import { VerificationModal } from "@/components/VerificationModal/VerificationModal";
import { VerificationModalProvider } from "@/components/VerificationModal/VerificationModalContext";

import { FloatingButtons } from "../../_components/MainContent";
import { HomeShortcuts } from "../HomeShortcuts";

import { VerificationContent } from "./_components/VerificationContent";
import { VerificationHero } from "./_components/VerificationHero";

export const metadata: Metadata = {
  title: "Get Verified - Ink",
  description:
    "Get verified on Ink, Kraken's Layer 2 blockchain built on the Superchain. Join our verification program to establish your identity and unlock enhanced features.",
};

export default function GetVerifiedPage() {
  return (
    <VerificationModalProvider>
      <FeatureRequestModalProvider>
        <>
          <JsonLd
            schema={{
              "@type": "WebPage",
              name: "Get Verified on Ink",
              description: "Get verified on Ink's Layer 2 blockchain",
              url: "https://inkonchain.com/get-verified",
            }}
          />
          <PageView />
          <HomeShortcuts />
          <div className="flex flex-col gap-8 mt-0 mb-12 lg:mb-24">
            <div className={containerClasses() + " relative h-[85vh]"}>
              <AnchorIntoView anchor="#">
                <div className="pt-8 sm:pt-16">
                  <VerificationHero />
                </div>
              </AnchorIntoView>
              <FloatingButtons showCountdown={false} showSuperchain={true} />
            </div>

            <div className={containerClasses()}>
              <VerificationContent />
            </div>
          </div>
          <VerificationModal iframeUrl="https://surveys.kraken.com/jfe/form/SV_b1VtoIEAznLivA2" />
          <FeatureRequestModal iframeUrl="https://surveys.kraken.com/jfe/form/SV_9QuEXbhC958nQtU" />
        </>
      </FeatureRequestModalProvider>
    </VerificationModalProvider>
  );
}
