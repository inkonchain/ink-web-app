import { useCallback, useEffect, useState } from "react";

// Define the hCaptcha window interface
interface HCaptchaWindow extends Window {
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

declare const window: HCaptchaWindow;

export function useHCaptcha(sitekey: string, ready: boolean) {
  const [hcaptchaLoaded, setHcaptchaLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.hcaptcha) {
      const script = document.createElement("script");
      script.src = `https://js.hcaptcha.com/1/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setHcaptchaLoaded(true);
      };
      document.body.appendChild(script);
    } else if (typeof window !== "undefined" && window.hcaptcha) {
      setHcaptchaLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (hcaptchaLoaded && !widgetId && sitekey && sitekey !== "" && ready) {
      const id = window.hcaptcha.render("hcaptcha-container", {
        sitekey: sitekey,
        size: "invisible",
      });
      setWidgetId(id);
    }
  }, [hcaptchaLoaded, sitekey, widgetId, ready]);

  const executeHCaptcha = useCallback(async () => {
    if (!hcaptchaLoaded || !widgetId)
      throw new Error("hCaptcha not initialized");
    try {
      console.debug("Executing hCaptcha with widgetId:", widgetId);
      const token = await window.hcaptcha.execute(widgetId, { async: true });
      return token;
    } catch (error) {
      console.error("hCaptcha execution error:", error);
      throw error;
    }
  }, [hcaptchaLoaded, widgetId]);

  return { hcaptchaLoaded, executeHCaptcha };
}
