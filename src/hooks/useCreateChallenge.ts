import { useMutation } from "@tanstack/react-query";
import { ChallengeResponse, ChallengeResponseBody } from "@/types/verification";

export const useCreateChallenge = () => {
  return useMutation<ChallengeResponse, Error, { user_address: string }>({
    mutationFn: async (variables) => {
      const response = await fetch("/api/auth/challenges/new", {
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
      return ChallengeResponseBody.parse(data);
    },
  });
};
