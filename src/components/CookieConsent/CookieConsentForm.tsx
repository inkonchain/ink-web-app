"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import Consent, { ConsentType } from "@/integrations/consent";

import { KeyboardShortcut } from "../KeyboardShortcut";

import { ConsentAcceptAll } from "./ConsentAcceptAll";

interface CookieConsentProps {
  // If undefined there was no consent decision taken
  initialConsent?: boolean;
  onAccept: VoidFunction;
  onRefuse: VoidFunction;
}

export const CookieConsentForm: React.FC<CookieConsentProps> = (props) => {
  const { initialConsent, onAccept, onRefuse } = props;

  const [decisionMade, setDecisionMade] = useState<boolean | undefined>(
    undefined
  );

  function decision(accepted: boolean) {
    setDecisionMade(accepted);
    if (accepted) {
      Consent.fire(ConsentType.CONSENT);
      onAccept();
    } else {
      onRefuse();
    }
  }

  const currentConsent =
    initialConsent !== undefined ? initialConsent : decisionMade;

  useCallbackOnKey({
    isDisabled: currentConsent !== undefined,
    key: "n",
    handler: () => {
      decision(false);
      return true;
    },
  });
  useCallbackOnKey({
    isDisabled: currentConsent !== undefined,
    key: "y",
    handler: () => {
      decision(true);
      return true;
    },
  });

  // A decision was taken.
  if (currentConsent !== undefined) {
    // The decision was to accept.
    if (currentConsent) {
      return <ConsentAcceptAll />;
    }

    return null;
  }

  const buttonClasses =
    "flex-1 uppercase flex items-center justify-center py-3 hover:text-blackMagic/60 dark:hover:text-whiteMagic/80";

  return (
    <motion.div
      className="fixed bottom-0 left-0 m-4 max-w-[350px] lg:bottom-1 bg-white dark:bg-blackMagic text-blackMagic dark:text-whiteMagic z-50 flex flex-col rounded-xl overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
    >
      <div className="flex gap divide-x divide-blackMagic/25 dark:divide-whiteMagic/25">
        <button
          type="button"
          className={buttonClasses}
          onClick={() => decision(false)} // As this is a server action, we have to make sure to not pass the event object
        >
          <span className="font-semibold">Decline</span>
          <span className="pl-1">
            <KeyboardShortcut letter="N" />
          </span>
        </button>

        <button
          type="button"
          className={buttonClasses}
          onClick={() => decision(true)}
        >
          <span className="font-semibold">Accept</span>
          <span className="pl-1">
            <KeyboardShortcut letter="Y" />
          </span>
        </button>
      </div>

      <p className="px-4 py-3 text-xs border-t border-blackMagic/25 dark:border-whiteMagic/25">
        By choosing to Accept, you consent to the use of cookies and similar
        technologies to enhance site navigation, analyse site usage, and assist
        in our marketing and security efforts.
      </p>
    </motion.div>
  );
};
