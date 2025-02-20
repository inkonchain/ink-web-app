"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AnalyticsProvider } from "@/contexts/AnalyticsProvider";
import { RelayProvider } from "@/contexts/RelayProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { WalletProvider } from "@/contexts/WalletProvider";
import { clientEnv } from "@/env-client";
import { useGlobalKeyCallback } from "@/hooks/useGlobalKey";

import { AppSubmissionModalProvider } from "./AppSubmissionModal/AppSubmissionModalContext";
import { ContactUsModalContextProvider } from "./ContactUsModal/ContactUsModalContext";
import { NewsletterModalContextProvider } from "./NewsletterModal/NewsletterModalContext";

const queryClient = new QueryClient();

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  useGlobalKeyCallback();

  return (
    <ThemeProvider>
      <AnalyticsProvider writeKey={clientEnv.NEXT_PUBLIC_SEGMENT_WRITE_KEY}>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <RelayProvider>
              <NewsletterModalContextProvider>
                <ContactUsModalContextProvider>
                  <AppSubmissionModalProvider>
                    {children}
                  </AppSubmissionModalProvider>
                </ContactUsModalContextProvider>
              </NewsletterModalContextProvider>
            </RelayProvider>
          </WalletProvider>
        </QueryClientProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
};
