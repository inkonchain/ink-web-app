import { FC } from "react";
import { useTranslations } from "next-intl";

import { Stepper } from "@/components/Stepper";

interface VerificationStepsProps {
  isConfirming: boolean;
  isRedirecting: boolean;
  verificationSuccess: boolean;
  hasSuccessfullySignedInToKraken: boolean;
  isConnected: boolean;
  initVerification: {
    isPending: boolean;
    isSuccess: boolean;
  };
}

export const VerificationSteps: FC<VerificationStepsProps> = ({
  isConfirming,
  isRedirecting,
  verificationSuccess,
  hasSuccessfullySignedInToKraken,
  isConnected,
  initVerification,
}: VerificationStepsProps) => {
  const t = useTranslations("Verify");

  const verificationSteps = [
    {
      title: t("flow.step1.title"),
      description: t("flow.step1.description"),
      completed: verificationSuccess || isConnected,
    },
    {
      title: t("flow.step2.title"),
      description: t("flow.step2.description"),
      completed:
        verificationSuccess ||
        initVerification.isPending ||
        initVerification.isSuccess ||
        hasSuccessfullySignedInToKraken,
      loading: isConfirming,
    },
    {
      title: t("flow.step3.title"),
      description: t("flow.step3.description"),
      completed: hasSuccessfullySignedInToKraken,
      loading: isRedirecting,
    },
    {
      title: t("flow.step4.title"),
      description: t("flow.step4.description"),
      completed: verificationSuccess,
      loading: hasSuccessfullySignedInToKraken,
    },
  ];

  return <Stepper steps={verificationSteps} />;
};

VerificationSteps.displayName = "VerificationSteps";
