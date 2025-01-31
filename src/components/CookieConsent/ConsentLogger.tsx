"use client";

import { useEffect } from "react";

import Consent, { ConsentType } from "@/integrations/consent";

export const ConsentLogger = () => {
  useEffect(() => {
    Consent.on(ConsentType.CONSENT, () => {
      console.debug("[ConsentLogger] Consent was granted.");
    });
  }, []);

  return null;
};
