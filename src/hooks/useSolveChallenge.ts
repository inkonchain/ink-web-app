import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { parseSignature, type Hex } from "viem";

export const ChallengeSolutionResponseSchema = z.object({
  solved: z.boolean(),
  oauth_url: z.string().url(),
});

export type ChallengeSolution = z.infer<typeof ChallengeSolutionResponseSchema>;

export const useSolveChallenge = () => {
  return useMutation<
    ChallengeSolution,
    Error,
    { challenge_id: string; challenge_signature: Hex }
  >({
    mutationFn: async (variables) => {
      const { r, s, v } = parseSignature(variables.challenge_signature);

      const response = await fetch("/api/auth/challenge/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge_id: variables.challenge_id,
          challenge_signature: {
            r: r.toString(),
            s: s.toString(),
            v: v?.toString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to solve challenge");
      }

      const data = await response.json();
      return ChallengeSolutionResponseSchema.parse(data);
    },
  });
};
