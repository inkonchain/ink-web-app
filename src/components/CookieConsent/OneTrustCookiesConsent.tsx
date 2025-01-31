"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

import { onAcceptCookiePolicy, onRefuseCookiePolicy } from "@/actions/consent";
import Consent, { ConsentType } from "@/integrations/consent";

interface OneTrustCookieConsentProps {
  id: string;
}

export const OneTrustCookieConsent: React.FC<OneTrustCookieConsentProps> = ({
  id,
}) => {
  const query = useSearchParams();

  /** OneTrust Cookies Consent Notice start for inkonchain.com */
  const initCode = `
   window.oneTrustLoaded = new Promise(function (resolve) {
          window.OptanonWrapper = function OptanonWrapper() {
            resolve(window.OneTrust);
          };
        });
  `;

  useEffect(() => {
    if (query.get("consent")) {
      onAcceptCookiePolicy();
      Consent.fire(ConsentType.CONSENT);
    }
  }, [query]);

  useEffect(() => {
    window.oneTrustLoaded?.then((oneTrust: { OnConsentChanged: Function }) => {
      oneTrust.OnConsentChanged(() => {
        hasConsent(OneTrustCookieGroups.Performance).then((consented) => {
          if (consented) {
            onAcceptCookiePolicy();
            Consent.fire(ConsentType.CONSENT);
          } else {
            onRefuseCookiePolicy();
          }
        });
      });
    });
  }, []);

  return (
    <>
      <Script
        id="otSDKStub"
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        type="text/javascript"
        charSet="UTF-8"
        data-domain-script={id}
      ></Script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: initCode }}
      />
    </>
  );
};

enum OneTrustCookieGroups {
  StrictlyNecessary = "C0001",
  Performance = "C0002",
  Functional = "C0003",
  Advertising = "C0004",
  SocialMedia = "C0005",
}

function hasConsent(onetrustCookieGroup: OneTrustCookieGroups) {
  return new Promise((resolve) => {
    return waitUntilConditionIsMet({
      condition: () => Boolean(window.OnetrustActiveGroups),
      retries: 10,
      retriesInterval: 100,
    }).then(() => {
      resolve(window.OnetrustActiveGroups?.includes(onetrustCookieGroup));
    });
  });
}

async function waitUntilConditionIsMet({
  condition,
  retries,
  retriesInterval,
}: {
  condition: () => boolean;
  retries: number;
  retriesInterval: number;
}) {
  let currentRetry = 0;
  while (!condition() && currentRetry < retries) {
    await new Promise((resolve) => setTimeout(resolve, retriesInterval));
    currentRetry++;
  }
  return condition();
}
