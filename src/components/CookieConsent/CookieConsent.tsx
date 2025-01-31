import { cookies } from "next/headers";

import { onAcceptCookiePolicy, onRefuseCookiePolicy } from "@/actions/consent";
import {
  NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_ONE_TRUST_ID,
} from "@/env-client";
import { COOKIE_CONSENT } from "@/integrations/consent";

import { ConsentAcceptAll } from "./ConsentAcceptAll";
import { CookieConsentForm } from "./CookieConsentForm";
import { OneTrustCookieConsent } from "./OneTrustCookiesConsent";

const IS_OPEN_TRUST_ENABLE_FOR_ENV =
  NEXT_PUBLIC_ENVIRONMENT !== "local" &&
  NEXT_PUBLIC_ENVIRONMENT !== "development" &&
  NEXT_PUBLIC_ENVIRONMENT !== "ci";

export const CookieConsent = async () => {
  const isEuropeanCountry = true;
  const cookieStore = await cookies();
  const cookieConsent = cookieStore.get(COOKIE_CONSENT)?.value;

  const initialConsent =
    cookieConsent === "true"
      ? true
      : cookieConsent === "false"
        ? false
        : undefined;

  return (
    <>
      {NEXT_PUBLIC_ONE_TRUST_ID && IS_OPEN_TRUST_ENABLE_FOR_ENV ? (
        <OneTrustCookieConsent id={NEXT_PUBLIC_ONE_TRUST_ID} />
      ) : isEuropeanCountry ? (
        <CookieConsentForm
          initialConsent={initialConsent}
          onAccept={onAcceptCookiePolicy}
          onRefuse={onRefuseCookiePolicy}
        />
      ) : (
        <ConsentAcceptAll />
      )}
    </>
  );
};
