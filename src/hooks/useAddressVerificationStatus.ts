import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const ResponseSchema = z.object({
  is_verified: z.boolean(),
});

type VerificationResponse = {
  isVerified: boolean;
};

export function useAddressVerificationStatus(address: string | undefined) {
  return useQuery<VerificationResponse, Error>({
    queryKey: ["verification-status", address],
    queryFn: async () => {
      if (!address) {
        throw new Error("No address provided");
      }

      const response = await fetch(`/api/auth/verifications/${address}`);

      if (!response.ok) {
        throw new Error(
          `Verification check failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Validate and transform the response
      const validated = ResponseSchema.parse(data);
      return {
        isVerified: validated.is_verified,
      };
    },
    enabled: Boolean(address),
    staleTime: 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
