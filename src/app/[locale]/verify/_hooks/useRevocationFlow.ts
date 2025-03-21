import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSignMessage } from "wagmi";

import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useRevokeVerification } from "@/hooks/useRevokeVerification";

import { showErrorToast, showSuccessToast } from "../_components/VerifyToast";

export const useRevocationFlow = (address: `0x${string}` | undefined) => {
  const [isRevoking, setIsRevoking] = useState(false);
  const t = useTranslations("Verify");
  const createChallenge = useCreateChallenge();
  const { signMessageAsync } = useSignMessage();
  const revokeVerification = useRevokeVerification();

  const handleRevoke = async () => {
    if (!address) {
      return;
    }

    try {
      setIsRevoking(true);

      const challenge = await createChallenge.mutateAsync({
        user_address: address,
      });

      const signature = await signMessageAsync({
        message: challenge.message,
      });

      const data = await revokeVerification.mutateAsync({
        challenge_id: challenge.id,
        challenge_signature: signature,
      });

      if (data.status === "success") {
        showSuccessToast(
          t("toast.revoke.title"),
          t("toast.revoke.description"),
          data.transaction_hash
        );
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      console.error("Error during revocation:", error);
      showErrorToast(t("toast.error.revoke"));
    } finally {
      setIsRevoking(false);
    }
  };

  return {
    isRevoking,
    handleRevoke,
  };
};
