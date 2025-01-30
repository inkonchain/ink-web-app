"use client";

import { useEffect } from "react";

import Consent, { ConsentType } from "@/integrations/consent";

// Relevant for non-EU countries or whenever you just want to accept all.
export const ConsentAcceptAll: React.FC = () => {
  useEffect(() => {
    Consent.fire(ConsentType.CONSENT);
  }, []);

  return null;
};
