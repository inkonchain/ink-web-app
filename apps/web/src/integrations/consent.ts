import { getCookie, hasCookie } from "cookies-next";

export const COOKIE_CONSENT = "ink_cookie_consent";

export interface CookieConfig {
  path: string;
  maxAge: number;
  sameSite: "strict";
  httpOnly: boolean;
}

export enum ConsentType {
  CONSENT = "consent",
}

type ConsentStatus = Record<ConsentType, boolean>;

export const getConsentStatus = (): ConsentStatus => {
  return {
    consent: hasCookie(COOKIE_CONSENT) && getCookie(COOKIE_CONSENT) === "true",
  };
};

interface ConsentCallback {
  type: ConsentType;
  callback: () => void;
}

class ConsentHandler {
  private callbacks: ConsentCallback[] = [];
  private status: ConsentStatus = getConsentStatus();

  on(type: ConsentType, callback: () => void) {
    if (this.status[type]) {
      callback();
    } else {
      this.callbacks.push({ type, callback });
    }
  }

  off(type: ConsentType, callback: () => void) {
    this.callbacks = this.callbacks.filter(
      (c) => c.type !== type && c.callback !== callback
    );
  }

  fire(type: ConsentType) {
    this.callbacks.filter((c) => c.type === type).forEach((c) => c.callback());
    this.status = getConsentStatus();
  }
}

// Uppercase naming to signal singleton instance and make auto imports
// `import Consent from` over `import consent from`
const Consent = new ConsentHandler();
export default Consent;
