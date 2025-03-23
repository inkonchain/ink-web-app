import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignMessage } from "wagmi";

import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useInitVerification } from "@/hooks/useInitVerification";

export const useVerificationFlow = (address: `0x${string}` | undefined) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const createChallenge = useCreateChallenge();
  const { signMessageAsync } = useSignMessage();
  const initVerification = useInitVerification();

  const handleProveIdentity = async () => {
    if (!address) {
      return;
    }

    try {
      setIsConfirming(true);
      const challenge = await createChallenge.mutateAsync({
        user_address: address,
      });
      const signature = await signMessageAsync({ message: challenge.message });
      const data = await initVerification.mutateAsync({
        challenge_id: challenge.id,
        challenge_signature: signature,
      });

      // Redirect to Kraken OAuth if challenge was solved
      if (data.oauth_url) {
        router.push(data.oauth_url);
      }
    } finally {
      setIsConfirming(false);
    }
  };

  return {
    isConfirming,
    handleProveIdentity,
    initVerification,
  };
};
