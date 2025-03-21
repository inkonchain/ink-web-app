import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const ChallengeResponseSchema = z.object({
  id: z.string(),
  user_address: z.string(),
  message: z.string(),
});

export type Challenge = z.infer<typeof ChallengeResponseSchema>;

export const useCreateChallenge = () => {
  return useMutation<Challenge, Error, { user_address: string }>({
    mutationFn: async (variables) => {
      const response = await fetch("/api/auth/challenge/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        throw new Error("Failed to create challenge");
      }

      const data = await response.json();
      return ChallengeResponseSchema.parse(data);
    },
  });
};
