import { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { AppSubmissionModal } from "@/components/Modals/AppSubmissionModal/AppSubmissionModal";
import { PageView } from "@/components/PageView";

import { AppsContent } from "../_components/AppsContent";

export const metadata: Metadata = {
  title: "Ink Apps - Discover DeFi Applications on the Superchain",
  description:
    "Explore a curated collection of DeFi applications built on Ink, Kraken's Layer 2 blockchain. Find innovative financial tools, protocols, and services powered by the Superchain.",
};

export default async function AppsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <>
      <JsonLd
        schema={{
          "@type": "CollectionPage",
          name: "Ink Apps Directory",
          description: "Directory of DeFi applications built on Ink",
          url: "https://inkonchain.com/apps",
        }}
      />
      <PageView />
      <AppsContent currentCategory={category} />
      <AppSubmissionModal />
    </>
  );
}
