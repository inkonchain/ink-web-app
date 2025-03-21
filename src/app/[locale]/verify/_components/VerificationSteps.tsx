import { FC } from "react";
import { useTranslations } from "next-intl";

import { Stepper } from "@/components/Stepper";

interface VerificationStepsProps {
  status: string | null;
  isConnected: boolean;
  initVerification: {
    isPending: boolean;
    isSuccess: boolean;
  };
}

export const VerificationSteps: FC<VerificationStepsProps> = ({
  status,
  isConnected,
  initVerification,
}: VerificationStepsProps) => {
  const t = useTranslations("Verify");

  const verificationSteps = [
    {
      title: t("flow.step1.title"),
      description: t("flow.step1.description"),
      completed: status === "success" || isConnected,
    },
    {
      title: t("flow.step2.title"),
      description: t("flow.step2.description"),
      completed:
        status === "success" ||
        initVerification.isPending ||
        initVerification.isSuccess,
    },
    {
      title: t("flow.step3.title"),
      description: t("flow.step3.description"),
      completed: status === "success",
    },
    {
      title: t("flow.step4.title"),
      description: t("flow.step4.description"),
      completed: status === "success",
    },
  ];

  return <Stepper steps={verificationSteps} />;
};
