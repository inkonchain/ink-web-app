"use client";

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import Script from "next/script";

import { clientEnv } from "@/env-client";

declare global {
  interface Window {
    hcaptcha: {
      render: (
        containerId: string,
        options: {
          sitekey: string;
          size?: string;
          callback?: (token: string) => void;
        }
      ) => string;
      execute: (
        widgetId?: string,
        options?: { async: boolean }
      ) => Promise<{ response: string }>;
      reset: (widgetId?: string) => void;
    };
  }
}

async function executeHCaptcha(widgetId: string) {
  if (!widgetId) throw new Error("hCaptcha not initialized");
  try {
    console.debug("Executing hCaptcha with widgetId:", widgetId);
    const token = await window.hcaptcha.execute(widgetId, { async: true });
    return token;
  } catch (error) {
    console.error("hCaptcha execution error:", error);
    throw error;
  }
}

interface CaptchaContextType {
  executeHCaptcha: () => Promise<{ response: string }>;
  isReady: boolean;
  isLoading: boolean;
  error: Error | null;
}

const CaptchaContext = createContext<CaptchaContextType | undefined>(undefined);

export const useCaptcha = (): CaptchaContextType => {
  const context = useContext(CaptchaContext);
  if (!context) {
    throw new Error("useCaptcha must be used within a CaptchaProvider");
  }
  return context;
};

export const CaptchaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  function init() {
    const id = window.hcaptcha.render("hcaptcha-container", {
      sitekey: clientEnv.NEXT_PUBLIC_HCAPTCHA_SITEKEY,
      size: "invisible",
    });
    setWidgetId(id);
  }

  const handleExecuteHCaptcha = useCallback(async () => {
    if (!widgetId) {
      setError(new Error("hCaptcha not initialized"));
      throw new Error("hCaptcha not initialized");
    }

    setIsLoading(true);
    setError(null);
    try {
      const token = await executeHCaptcha(widgetId);
      return token;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to execute captcha");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [widgetId]);

  return (
    <CaptchaContext.Provider
      value={{
        executeHCaptcha: handleExecuteHCaptcha,
        isReady: !!widgetId,
        isLoading,
        error,
      }}
    >
      {children}
      <Script
        src="https://js.hcaptcha.com/1/api.js?render=explicit"
        async
        defer
        onLoad={init}
      />
      <div
        id="hcaptcha-container"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          overflow: "hidden",
        }}
      />
    </CaptchaContext.Provider>
  );
};
