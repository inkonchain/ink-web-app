"use client";
import React, { SyntheticEvent, useEffect, useRef } from "react";
import { Checkbox, Field, Label } from "@headlessui/react";
import Image from "next/image";

import { subscribeToWaitlists } from "@/actions/subscribe-to-braze";
import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { useLegacyForm } from "@/hooks/useLegacyForm";
import { useModal } from "@/hooks/useModal";
import { EXTERNAL_LINKS, usePathname, useRouter } from "@/routing";

import { Backdrop } from "../Backdrop";
import { Button } from "../Button/Button";
import { ButtonLink } from "../Button/ButtonLink";
import { CenteredModal, CenteredModalContainer } from "../CenteredModal";
import { ColoredText } from "../ColoredText";
import { FormStatus } from "../FormStatus";
import { CheckmarkIcon } from "../icons/Checkmark";
import { EmailIcon } from "../icons/Email";
import { SpinnerIcon } from "../icons/Spinner";
import { TwitterIcon } from "../icons/Twitter";
import {
  inputClassNames,
  inputContainerClassNames,
  inputIconClassNames,
} from "../InputWithSubmit/styles";
import { SocialLinksRow } from "../SocialLinksRow";

import { useNewsletterModalContext } from "./NewsletterModalContext";

export interface NewsletterModalProps {}

export const NewsletterModal: React.FC<NewsletterModalProps> = () => {
  const { isOpen, setIsOpen } = useNewsletterModalContext();

  function closeModal() {
    setIsOpen(false);
  }

  useModal({ isOpen, closeModal, modalKey: "newsletter-modal" });
  const { isPending, state, formAction, onSubmit } = useLegacyForm(
    subscribeToWaitlists,
    {
      success: false,
      error: undefined,
    }
  );

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      window.scrollTo(0, scrollY);
    }
  }, [isOpen]);

  useCallbackOnKey({
    key: "s",
    handler: () => {
      if (pathname !== "/") {
        router.push("/");
        // When the route changes, sometimes the state gets reset for some reason.
        // `isFormOpen` stays "false", but the `AnimatePresence` still plays, which leaves us into a weird state.
        // This workarounds seems to fix it consistently by delaying the state update.
        setTimeout(() => setIsOpen(true), 500);
      } else {
        setIsOpen(true);
      }
      return true;
    },
  });

  if (!isOpen) return null;

  return (
    <CenteredModalContainer className="fixed inset-0 isolate z-[9999]">
      <Backdrop isVisible={isOpen} onClick={closeModal} />
      <CenteredModal
        isOpen={isOpen}
        closeModal={closeModal}
        contentClassName="max-w-[536px] flex-1 relative z-[10000]"
      >
        <div className="flex flex-col gap-8 items-center w-full p-8">
          <div className="flex flex-col gap-4 items-center">
            <Image
              src="/logo/logo.svg"
              width={168}
              height={64}
              alt="ink logo"
            />
            <ColoredText
              variant="purple-dark"
              className="text-2xl text-center font-medium"
            >
              {state.success
                ? "Welcome, thanks for joining Ink"
                : "Join the community for the latest updates, news and announcements"}
            </ColoredText>
          </div>
          {state.success ? (
            <SuccessActions />
          ) : (
            <NewsletterModalForm
              isOpen={isOpen}
              isPending={isPending}
              formAction={formAction}
              onSubmit={onSubmit}
              state={state}
            />
          )}
        </div>
      </CenteredModal>
    </CenteredModalContainer>
  );
};

interface NewsletterModalFormProps {
  isOpen: boolean;
  isPending: boolean;
  formAction: (payload: FormData) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  state: {
    success: boolean;
    error?: { email?: string; form?: string };
  };
}

const NewsletterModalForm: React.FC<NewsletterModalFormProps> = ({
  isOpen,
  isPending,
  state,
  formAction,
  onSubmit,
}) => {
  const input = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isOpen && input.current) {
      // input.current.focus();
    }
  }, [input, isOpen]);

  return (
    <form
      className="flex flex-col gap-8 w-full"
      action={formAction}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="text-body">
            Select one or both newsletters to receive tailored updates
          </div>
          <CheckboxField
            name="subscribe-general-list"
            label="General updates"
          />
          <CheckboxField
            name="subscribe-builder-list"
            label="Builder/Developer updates"
          />
        </div>
        <div>
          <div
            className={inputContainerClassNames({
              variant: "gray",
              hasIcon: true,
              hasError: !!state.error?.email,
              size: "lg",
            })}
          >
            <input
              className={inputClassNames({
                extraClassName: "pb-[3px]",
                variant: "gray",
              })}
              placeholder="Email"
              name="email"
              disabled={!isOpen}
              ref={input}
              autoComplete="off"
            />
            <div className={inputIconClassNames({ variant: "gray" })}>
              <EmailIcon size="icon-md" enforce="black" />
            </div>
          </div>
        </div>
      </div>
      <SubmitButton success={state.success} isPending={isPending} />

      {state.error?.form && (
        <div className="relative">
          <FormStatus errorMessage={state.error.form} />
        </div>
      )}
    </form>
  );
};

const CheckboxField: React.FC<{
  name: string;
  label: string;
}> = ({ name, label }) => (
  <Field className="flex items-center gap-2 group">
    <Checkbox
      name={name}
      className="group relative flex items-center justify-center bg-zinc-300 p-3 rounded-lg group-hover:bg-zinc-400 ring-transparent ring-2 group-focus-within:ring-krakenPurple data-[checked]:bg-krakenPurple data-[checked]:group-hover:bg-krakenPurple/80"
    >
      <div className="text-whiteMagic absolute inset-0 hidden items-center justify-center group-data-[checked]:flex">
        <CheckmarkIcon size="icon-xs" enforce="white" />
      </div>
    </Checkbox>
    <Label className="font-bold text-label">{label}</Label>
  </Field>
);

const SubmitButton: React.FC<{ success: boolean; isPending: boolean }> = ({
  success,
  isPending,
}) => {
  return (
    <Button
      variant="primary"
      size="md"
      disabled={success || isPending}
      className="shadow-large-pop shadow-krakenPurple/50"
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-3">
          <SpinnerIcon size="icon-sm" enforce="white" />
          <span>Submitting...</span>
        </div>
      ) : (
        "Submit"
      )}
    </Button>
  );
};

const SuccessActions: React.FC = () => (
  <div className="flex flex-col items-center gap-6">
    <ButtonLink
      variant="primary"
      size="lg"
      icon={<TwitterIcon size="icon-lg" enforce="inherit" />}
      href={EXTERNAL_LINKS.twitter}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="text-base font-medium">SHARE ON X</div>
    </ButtonLink>
    <SocialLinksRow enforce="black" faded={true} includeMail={false} />
  </div>
);
