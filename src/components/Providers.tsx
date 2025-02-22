"use client";

import { PropsWithChildren } from "react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, ink, mainnet } from "viem/chains";
import { createConfig, http, WagmiProvider } from "wagmi";

import { AnalyticsProvider } from "@/contexts/AnalyticsProvider";
import { RelayProvider } from "@/contexts/RelayProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { clientEnv } from "@/env-client";
import { useGlobalKeyCallback } from "@/hooks/useGlobalKey";

import { AppSubmissionModalProvider } from "./AppSubmissionModal/AppSubmissionModalContext";
import { ContactUsModalContextProvider } from "./ContactUsModal/ContactUsModalContext";
import { NewsletterModalContextProvider } from "./NewsletterModal/NewsletterModalContext";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, ink, base],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [ink.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
});

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  useGlobalKeyCallback();

  return (
    <ThemeProvider>
      <AnalyticsProvider writeKey={clientEnv.NEXT_PUBLIC_SEGMENT_WRITE_KEY}>
        <DynamicContextProvider
          settings={{
            environmentId: clientEnv.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
            walletConnectors: [
              EthereumWalletConnectors,
              ZeroDevSmartWalletConnectors,
            ],
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RelayProvider>
                <NewsletterModalContextProvider>
                  <ContactUsModalContextProvider>
                    <AppSubmissionModalProvider>
                      <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
                    </AppSubmissionModalProvider>
                  </ContactUsModalContextProvider>
                </NewsletterModalContextProvider>
              </RelayProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </DynamicContextProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
};
