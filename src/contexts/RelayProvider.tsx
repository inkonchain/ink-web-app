"use client";

import { ReactNode } from "react";
import { useRelayChains } from "@reservoir0x/relay-kit-hooks";
import { RelayKitProvider } from "@reservoir0x/relay-kit-ui";
import { MAINNET_RELAY_API } from "@reservoir0x/relay-sdk";

import { NEXT_PUBLIC_DUNE_API_KEY } from "@/env-client";
import { useCurrentInkAppName } from "@/hooks/useCurrentInkAppName";
import { theme } from "@/util/relay-kit-theme";

import "@reservoir0x/relay-kit-ui/styles.css";

interface RelayProviderProps {
  children: ReactNode;
}

export const RelayProvider: React.FC<RelayProviderProps> = ({ children }) => {
  const { chains } = useRelayChains(MAINNET_RELAY_API);
  const appName = useCurrentInkAppName();

  return (
    <RelayKitProvider
      theme={theme}
      options={{
        appName: appName,
        appFees: [],
        chains: chains,
        duneApiKey: NEXT_PUBLIC_DUNE_API_KEY,
        baseApiUrl: MAINNET_RELAY_API,
      }}
    >
      {children}
    </RelayKitProvider>
  );
};

RelayProvider.displayName = "RelayProvider";
