import { FC } from "react";
import { useTranslations } from "next-intl";

import { Stepper } from "@/components/Stepper";

interface VerificationStepsProps {
  sessionSuccess: boolean;
  isConnected: boolean;
  initVerification: {
    isPending: boolean;
    isSuccess: boolean;
  };
}

export const VerificationSteps: FC<VerificationStepsProps> = ({
  sessionSuccess,
  isConnected,
  initVerification,
}: VerificationStepsProps) => {
  const t = useTranslations("Verify");

  const verificationSteps = [
    {
      title: t("flow.step1.title"),
      description: t("flow.step1.description"),
      completed: sessionSuccess || isConnected,
    },
    {
      title: t("flow.step2.title"),
      description: t("flow.step2.description"),
      completed:
        sessionSuccess ||
        initVerification.isPending ||
        initVerification.isSuccess,
    },
    {
      title: t("flow.step3.title"),
      description: t("flow.step3.description"),
      completed: sessionSuccess,
    },
    {
      title: t("flow.step4.title"),
      description: t("flow.step4.description"),
      completed: sessionSuccess,
    },
  ];

  return <Stepper steps={verificationSteps} />;
};
