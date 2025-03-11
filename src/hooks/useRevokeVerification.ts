import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseSignature, type Hex } from "viem";
import {
  RevokeVerificationResponse,
  RevokeVerificationResponseBody,
} from "@/types/verification";

export const useRevokeVerification = () => {
  const queryClient = useQueryClient();

  return useMutation<
    RevokeVerificationResponse,
    Error,
    { challenge_id: string; challenge_signature: Hex }
  >({
    mutationFn: async (variables) => {
      const { r, s, v } = parseSignature(variables.challenge_signature);

      const response = await fetch("/api/auth/verifications/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge_id: variables.challenge_id,
          challenge_signature: { r, s, v: v?.toString() },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to revoke verification");
      }

      return RevokeVerificationResponseBody.parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification-status"] });
    },
  });
};
