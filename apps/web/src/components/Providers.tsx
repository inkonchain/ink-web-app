"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NewsletterFormContextProvider } from "@/app/[locale]/_components/NewsletterForm/NewsletterFormContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsProvider";
import { RelayProvider } from "@/contexts/RelayProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { WalletProvider } from "@/contexts/WalletProvider";
import { NEXT_PUBLIC_SEGMENT_WRITE_KEY } from "@/env-client";
import { useGlobalKeyCallback } from "@/hooks/useGlobalKey";

import { AppSubmissionModalProvider } from "./AppSubmissionModal/AppSubmissionModalContext";
import { ContactUsModalContextProvider } from "./ContactUsModal/ContactUsModalContext";
import { MobileMenuContextProvider } from "./MobileMenu/MobileMenuContext";
import { NewsletterModalContextProvider } from "./NewsletterModal/NewsletterModalContext";

const queryClient = new QueryClient();

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  useGlobalKeyCallback();

  return (
    <ThemeProvider>
      <AnalyticsProvider writeKey={NEXT_PUBLIC_SEGMENT_WRITE_KEY || ""}>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <RelayProvider>
              <NewsletterFormContextProvider>
                <MobileMenuContextProvider>
                  <NewsletterModalContextProvider>
                    <ContactUsModalContextProvider>
                      <AppSubmissionModalProvider>
                        {children}
                      </AppSubmissionModalProvider>
                    </ContactUsModalContextProvider>
                  </NewsletterModalContextProvider>
                </MobileMenuContextProvider>
              </NewsletterFormContextProvider>
            </RelayProvider>
          </WalletProvider>
        </QueryClientProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
};
