import { useMutation } from "@tanstack/react-query";

import {
  CompleteVerificationResponse,
  CompleteVerificationResponseBody,
} from "@/types/verification";

export const useCompleteVerification = () => {
  return useMutation<
    CompleteVerificationResponse,
    Error,
    { code: string; state: string }
  >({
    mutationKey: ["complete-verification"],
    mutationFn: async ({ code, state }) => {
      if (!code || !state) {
        throw new Error("Missing code or state parameters");
      }

      const response = await fetch("/api/auth/verifications/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorData = responseData as { status: number; message: string };
        throw new Error(
          errorData.message ||
            `Failed to complete verification: ${response.status}`
        );
      }

      return CompleteVerificationResponseBody.parse(responseData);
    },
  });
};
