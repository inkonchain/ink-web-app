import { EXTERNAL_LINKS } from "@/routing";

export type BuilderResource =
  | {
      name: string;
      href: string;
      external: true;
    }
  | {
      name: string;
      href: "/faucet" | "/testnet-bridge";
      external?: false;
    };

export function builderResources(isMainnet: boolean): BuilderResource[] {
  const links: BuilderResource[] = [
    { name: "Ink Kit", href: EXTERNAL_LINKS.inkKit, external: true },
    { name: "Docs", href: EXTERNAL_LINKS.documentation, external: true },
    { name: "Status", href: EXTERNAL_LINKS.status, external: true },
    {
      name: "Explorer",
      href: isMainnet
        ? EXTERNAL_LINKS.mainnetExplorerBlockscout
        : EXTERNAL_LINKS.testnetExplorerBlockscout,
      external: true,
    },
    { name: "Testnet Faucet", href: "/faucet" },
    { name: "Github", href: EXTERNAL_LINKS.github, external: true },
  ];

  if (!isMainnet) {
    links.push({ name: "Bridge", href: "/testnet-bridge" });
  }

  return links;
}

export const builderFocusKeys = [
  "defi",
  "trading",
  "prediction",
  "rwa",
  "creator",
  "ai",
] as const;

export type BuilderFocusKey = (typeof builderFocusKeys)[number];

export const builderStats = [
  {
    key: "tvl",
    value: "$150M+",
    href: EXTERNAL_LINKS.defillamaInk,
  },
  {
    key: "secured",
    value: "$300M+",
    href: EXTERNAL_LINKS.l2beatInk,
  },
  {
    key: "transactions",
    value: "1M+",
    href: EXTERNAL_LINKS.growthepieInk,
  },
  {
    key: "blocks",
    value: "1s",
  },
] as const;

export type BuilderStatKey = (typeof builderStats)[number]["key"];

export const builderExpectations = [
  {
    title: "Sub-second block times",
    description: "1s block times Day 1, sub-second blocks coming soon.",
    icon: "/icons/1s-block-times.svg",
  },
  {
    title: "Smol Gas",
    description: "Ape more, pay less.",
    icon: "/icons/Smol-Gas.svg",
  },
  {
    title: "Security",
    description:
      "Sequencer-level security to protect users from malicious intents and exploits.",
    icon: "/icons/Security.svg",
  },
  {
    title: "Interoperability",
    description:
      "A commitment to the seamless flow of capital across the Superchain and beyond.",
    icon: "/icons/Interoperability.svg",
  },
  {
    title: "Unleashed by Kraken",
    description:
      "Ink will leverage Kraken's security and crypto expertise to support builders and users alike as they move towards independent financial sovereignty.",
    icon: "/icons/Unleashed-by-Kraken.svg",
  },
  {
    title: "Scaling Ethereum",
    description:
      "Ink is dedicated to scaling Ethereum with a powerful L2 that enhances performance and accessibility.",
    icon: "/icons/ethereum-eth-logo.svg",
  },
] as const;
