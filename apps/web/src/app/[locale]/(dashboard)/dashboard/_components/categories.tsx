import { InkIcon } from "@inkonchain/ink-kit";

import { AppsIcon } from "@/components/icons/Apps";
import { BankIcon } from "@/components/icons/Bank";
import { BlocksIcon } from "@/components/icons/Blocks";
import { BridgeIcon } from "@/components/icons/Bridge";
import { GlobeIcon } from "@/components/icons/Globe";
import { UsersIcon } from "@/components/icons/Users";

export const appCategories = [
  {
    value: null,
    label: "All categories",
    icon: <AppsIcon className="duration-0" enforce="inherit" size="icon-lg" />,
  },
  {
    value: "bridge",
    label: "Bridge",
    icon: (
      <BridgeIcon className="duration-0" enforce="inherit" size="icon-lg" />
    ),
  },
  {
    value: "defi",
    label: "DeFi",
    icon: <BankIcon className="duration-0" enforce="inherit" size="icon-lg" />,
  },
  {
    value: "explorers",
    label: "Explorers",
    icon: <GlobeIcon className="duration-0" enforce="inherit" size="icon-lg" />,
  },
  {
    value: "infra",
    label: "Infrastructure",
    icon: (
      <BlocksIcon className="duration-0" enforce="inherit" size="icon-lg" />
    ),
  },
  {
    value: "on-ramps",
    label: "On-ramps",
    icon: (
      <InkIcon.Wallet className="duration-0" enforce="inherit" size="icon-lg" />
    ),
  },
  {
    value: "social",
    label: "Social",
    icon: <UsersIcon className="duration-0" enforce="inherit" size="icon-lg" />,
  },
] as const;
