"use client";
import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxLabel,
  InkIcon,
  Input,
  Modal,
  useModalContext,
} from "@inkonchain/ink-kit";
import Image from "next/image";

import { subscribeToWaitlists } from "@/actions/subscribe-to-braze";
import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { useLegacyForm } from "@/hooks/useLegacyForm";
import { EXTERNAL_LINKS, Link } from "@/routing";

import { ColoredText } from "../ColoredText";
import { FormStatus } from "../FormStatus";
import { SocialLinksRow } from "../SocialLinksRow";

export interface NewsletterModalProps {}

export const NEWSLETTER_MODAL_KEY = "newsletter-modal";

export const NewsletterModal: React.FC<NewsletterModalProps> = () => {
  const { openModal } = useModalContext(NEWSLETTER_MODAL_KEY);

  const { isPending, state, formAction, onSubmit } = useLegacyForm(
    subscribeToWaitlists,
    {
      success: false,
      error: undefined,
    }
  );

  useCallbackOnKey({
    key: "s",
    handler: () => {
      openModal();
      return true;
    },
  });

  return (
    <Modal id={NEWSLETTER_MODAL_KEY} hasBackdrop title="Newsletter">
      {() => (
        <div className="flex flex-col gap-8 items-center w-full p-8 max-w-(--breakpoint-sm)">
          <div className="flex flex-col gap-4 items-center">
            <Image
              src="/logo/logo.svg"
              width={168}
              height={64}
              alt="ink logo"
            />
            <ColoredText
              variant="purple"
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
              isPending={isPending}
              formAction={formAction}
              onSubmit={onSubmit}
              state={state}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

interface NewsletterModalFormProps {
  isPending: boolean;
  formAction: (payload: FormData) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  state: {
    success: boolean;
    error?: { email?: string; form?: string };
  };
}

const NewsletterModalForm: React.FC<NewsletterModalFormProps> = ({
  isPending,
  state,
  formAction,
  onSubmit,
}) => {
  const [checkedGeneral, setCheckedGeneral] = useState(false);
  const [checkedBuilder, setCheckedBuilder] = useState(false);

  return (
    <form
      className="flex flex-col gap-8 w-full"
      action={formAction}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="ink:text-body-1-regular">
            Select one or both newsletters to receive tailored updates
          </div>
          <CheckboxLabel label="General updates">
            <Checkbox
              name="subscribe-general-list"
              checked={checkedGeneral}
              onChange={() => setCheckedGeneral(!checkedGeneral)}
            />
          </CheckboxLabel>
          <CheckboxLabel label="Builder/Developer updates">
            <Checkbox
              name="subscribe-builder-list"
              checked={checkedBuilder}
              onChange={() => setCheckedBuilder(!checkedBuilder)}
            />
          </CheckboxLabel>
        </div>
        <div>
          <Input
            placeholder="Email"
            name="email"
            iconLeft={<InkIcon.Mail size="icon-md" enforce="black" />}
          />
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

const SubmitButton: React.FC<{ success: boolean; isPending: boolean }> = ({
  success,
  isPending,
}) => {
  return (
    <Button variant="primary" size="md" disabled={success || isPending}>
      {isPending ? (
        <div className="flex items-center justify-center gap-3">
          <div className="ink:size-3">
            <InkIcon.Loading className="animate-spin" />
          </div>
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
    <Button
      variant="primary"
      size="lg"
      iconLeft={<InkIcon.Social.X size="icon-lg" />}
      asChild
    >
      <Link
        href={EXTERNAL_LINKS.twitter}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-base font-medium">SHARE ON X</div>
      </Link>
    </Button>
    <SocialLinksRow includeMail={false} />
  </div>
);
