"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { AnalyticsBrowser } from "@segment/analytics-next";

import { NEXT_PUBLIC_ENVIRONMENT } from "@/env-client";
import Consent, { ConsentType } from "@/integrations/consent";

interface AnalyticsContextProps {
  pageView: VoidFunction;
}

interface AnalyticsProviderProps {
  writeKey: string;
  children: ReactNode;
}

const AnalyticsContext = createContext<AnalyticsContextProps>({
  pageView: () => {},
});

export const AnalyticsProvider = ({
  writeKey,
  children,
}: AnalyticsProviderProps) => {
  const analytics = useMemo(() => new AnalyticsBrowser(), []);

  useEffect(() => {
    if (NEXT_PUBLIC_ENVIRONMENT === "local" && !writeKey) {
      return;
    }

    Consent.on(ConsentType.CONSENT, () => {
      analytics
        ?.load(
          { writeKey },
          {
            integrations: {
              "Segment.io": {
                deliveryStrategy: {
                  strategy: "batching",
                  config: {
                    // Number of events to batch together.
                    size: 10,
                    // Timeout (in ms) before flushing the batched events, even when size is not filled.
                    timeout: 5000,
                  },
                },
              },
            },
          }
        )
        .catch(() => {
          return;
        });
    });
  }, [writeKey, analytics]);

  const pageView = () => {
    analytics?.page();
  };

  return (
    <AnalyticsContext.Provider value={{ pageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
