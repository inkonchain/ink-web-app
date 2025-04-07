import { FC } from "react";
import { useTranslations } from "next-intl";

import { Stepper } from "@/components/Stepper";

interface VerificationStepsProps {
  isConnected: boolean;
  isConfirming: boolean;
  initVerification: {
    isPending: boolean;
    isSuccess: boolean;
  };
  hasSuccessfullySignedInToKraken: boolean;
  completeVerification: {
    isPending: boolean;
    isSuccess: boolean;
  };
}

export const VerificationSteps: FC<VerificationStepsProps> = ({
  isConnected,
  isConfirming,
  initVerification,
  hasSuccessfullySignedInToKraken,
  completeVerification,
}: VerificationStepsProps) => {
  const t = useTranslations("Verify");

  const verificationSteps = [
    {
      title: t("flow.step1.title"),
      description: t("flow.step1.description"),
      completed: isConnected,
    },
    {
      title: t("flow.step2.title"),
      description: t("flow.step2.description"),
      completed:
        initVerification.isPending ||
        initVerification.isSuccess ||
        hasSuccessfullySignedInToKraken,
      loading: isConfirming,
    },
    {
      title: t("flow.step3.title"),
      description: t("flow.step3.description"),
      completed:
        completeVerification.isSuccess || hasSuccessfullySignedInToKraken,
      loading: initVerification.isPending || initVerification.isSuccess,
    },
    {
      title: t("flow.step4.title"),
      description: t("flow.step4.description"),
      completed: completeVerification.isSuccess,
      loading:
        hasSuccessfullySignedInToKraken && completeVerification.isPending,
    },
  ];

  return <Stepper steps={verificationSteps} />;
};

VerificationSteps.displayName = "VerificationSteps";
