"use client";
import React from "react";
import { Button } from "@inkonchain/ink-kit";
import Lottie from "lottie-react";
import Image from "next/image";

import type { FormState } from "@/actions/submit-your-app";
import { submitYourApp } from "@/actions/submit-your-app";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { useForm } from "@/hooks/useForm";
import { useModal } from "@/hooks/useModal";
import {
  AppSubmissionFormData,
  appSubmissionSchema,
} from "@/schemas/app-submission-schema";

import { Backdrop } from "../Backdrop";
import { CenteredModal, CenteredModalContainer } from "../CenteredModal";
import { ColoredText } from "../ColoredText";

import { AppSubmissionForm } from "./_components/AppSubmissionForm";
import { PullRequestButton } from "./_components/PullRequestButton";
import animation from "./animation.json";
import { useAppSubmissionModalContext } from "./AppSubmissionModalContext";

export const AppSubmissionModal: React.FC = () => {
  const { isOpen, setIsOpen } = useAppSubmissionModalContext();

  function closeModal() {
    reset();
    setIsOpen(false);
    form.reset();
  }

  useModal({ isOpen, closeModal, modalKey: "app-submission-modal" });

  const { state, form, formAction, onSubmit, reset, isSubmitting } = useForm<
    FormState,
    AppSubmissionFormData
  >(
    submitYourApp,
    { message: "", success: false },
    appSubmissionSchema,
    useFeatureFlag("prefillAppSubmission")
      ? {
          name: "Test App",
          shortDescription:
            "This is a test description for the app submission form",
          categories: ["Bridge"],
          network: "Mainnet",
          tags: ["cross-chain"],
          mainnetWebsite: "https://example.com",
          testnetWebsite: "https://test.example.com",
          x: "https://x.com/test",
          discord: "https://discord.gg/test",
          telegram: "https://t.me/test",
          github: "https://github.com/test",
          farcaster: "https://warpcast.com/test",
          smartContractUrl:
            "https://explorer.inkonchain.com/address/0x00000000E3dA5fC031282A39759bDDA78ae7fAE5",
        }
      : {}
  );

  if (!isOpen) return null;

  return (
    <CenteredModalContainer className="fixed inset-0 isolate z-[9999]">
      <Backdrop isVisible={isOpen} onClick={closeModal} />
      <CenteredModal
        isOpen={isOpen}
        closeModal={closeModal}
        contentClassName="relative z-[10000] dark:bg-softDarkPurple dark:text-white/50"
        scrollable={true}
      >
        <div className="sm:w-96 max-w-[70vw] h-full overflow-x-hidden">
          {state.success ? (
            <div className="flex flex-col gap-2 items-center h-full">
              <Lottie
                animationData={animation}
                loop={false}
                className="w-[200px]"
              />
              <div className="flex flex-col gap-6 items-center">
                <ColoredText
                  variant="purple"
                  className="text-2xl font-bold text-center"
                >
                  App submitted
                </ColoredText>
                <p className="text-center text-md">
                  Our team will review your request promptly.
                </p>
              </div>
              <div className="mt-[15px] flex justify-center">
                <PullRequestButton
                  pullRequestUrl={
                    state.prUrl ||
                    "https://github.com/inkonchain/ink-web-app/pulls"
                  }
                />
              </div>
              <div className="flex flex-1 items-end justify-center mt-10">
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={closeModal}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 items-center mb-8">
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
                  Submit your app to be included into our ecosystem
                </ColoredText>
              </div>
              <AppSubmissionForm
                isOpen={isOpen}
                form={form}
                formAction={formAction}
                onSubmit={onSubmit}
                state={state}
                isSubmitting={isSubmitting}
              />
            </>
          )}
        </div>
      </CenteredModal>
    </CenteredModalContainer>
  );
};
