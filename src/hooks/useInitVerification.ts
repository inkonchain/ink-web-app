import { useMutation } from "@tanstack/react-query";
import {
  InitVerificationResponse,
  InitVerificationResponseBody,
} from "@/types/verification";
import { parseSignature, type Hex } from "viem";

export const useInitVerification = () => {
  return useMutation<
    InitVerificationResponse,
    Error,
    { challenge_id: string; challenge_signature: Hex }
  >({
    mutationFn: async (variables) => {
      const { r, s, v } = parseSignature(variables.challenge_signature);

      const response = await fetch("/api/auth/verifications/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge_id: variables.challenge_id,
          challenge_signature: { r, s, v: v?.toString() },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize verification");
      }

      const data = await response.json();
      return InitVerificationResponseBody.parse(data);
    },
  });
};
