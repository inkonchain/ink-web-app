"use client";

import { useEffect, useRef } from "react";

import { useAnalytics } from "@/contexts/AnalyticsProvider";

export const PageView = () => {
  const { pageView } = useAnalytics();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) {
      return;
    }

    pageView();
    called.current = true;
  }, [pageView]);

  return null;
};
