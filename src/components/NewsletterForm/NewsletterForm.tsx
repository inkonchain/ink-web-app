"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { subscribeToGeneralWaitlist } from "@/actions/subscribe-to-braze";
import { FormStatus } from "@/components/FormStatus";
import { MailIcon } from "@/components/icons/Mail";
import { ButtonIntoInputOverlay } from "@/components/InputWithSubmit";
import { InputWithSubmit } from "@/components/InputWithSubmit/InputWithSubmit";
import { KeyboardShortcut } from "@/components/KeyboardShortcut";
import { classNames } from "@/util/classes";
import { largeMovementTransition } from "@/util/transitions";

import { SuccessState } from "./SuccessState";

export interface NewsletterFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hasShortcut?: boolean;
  copy: {
    ctaLabel: string;
  };
}

/** Probably deprecated for now since we won't use the inline email any more */
export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  isOpen,
  setIsOpen,
  hasShortcut,
  copy,
}) => {
  const [state, formAction] = useActionState(subscribeToGeneralWaitlist, {
    success: false,
    error: undefined,
  });

  return (
    <div className="flex-1 flex flex-col text-center gap-6">
      <AnimatePresence initial={false} mode="sync">
        {!state.success ? (
          <motion.form
            key="form"
            className="flex flex-col gap-4"
            action={formAction}
            data-testid="main-email-form"
            transition={largeMovementTransition}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <div className="flex flex-col gap-8">
              <InputWithSubmit
                className={classNames({
                  // Fixes a weird subpixel issue with the overlay in dark mode
                  "bg-transparent border-transparent shadow-large-pop shadow-krakenPurple/50":
                    !isOpen,
                })}
                autoFocusOnEnable
                name="email"
                variant="default"
                sizeVariant="large"
                placeholder="Email address"
                disabled={!isOpen}
                icon={<MailIcon size="icon-lg" enforce="black" />}
              >
                <ButtonIntoInputOverlay
                  className="font-bold"
                  isClosed={isOpen}
                  setIsClosed={(isClosed) => setIsOpen(isClosed)}
                >
                  {copy.ctaLabel}
                  {hasShortcut && <KeyboardShortcut letter="S" />}
                </ButtonIntoInputOverlay>
              </InputWithSubmit>
            </div>

            {state.error?.form && (
              <div className="relative">
                <FormStatus errorMessage={state.error.form} />
              </div>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            transition={largeMovementTransition}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <SuccessState />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
