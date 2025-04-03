import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

interface VerificationSession {
  id: string;
  status: string; // "success" | "error"
  error_message?: string;
  user_wallet_address?: string;
  transaction_hash?: string;
  used: boolean;
}

export const useVerificationSession = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session");

  const clearSessionParam = useCallback(() => {
    const verifyPage = searchParams.get("verifyPage") ? "?verifyPage=true" : "";
    router.replace(window.location.pathname + verifyPage, { scroll: false });
  }, [router, searchParams]);

  const { data: session, isLoading } = useQuery<
    VerificationSession | null,
    Error
  >({
    queryKey: ["verification-session", sessionId],
    queryFn: async () => {
      if (!sessionId) {
        return null;
      }

      const response = await fetch(
        `/api/auth/verifications/sessions/${sessionId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Session not found or expired
        }
        throw new Error(
          `Failed to fetch verification session: ${response.status}`
        );
      }

      return await response.json();
    },
    enabled: Boolean(sessionId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 0, // Don't cache this data
    gcTime: 0, // Remove from cache immediately when unused
  });

  // Use effect to clear the session parameter after successful fetch
  useEffect(() => {
    if (session && sessionId) {
      clearSessionParam();
    }
  }, [session, sessionId, clearSessionParam]);

  return {
    session,
    isLoading,
    hasSession: Boolean(sessionId),
    isSuccess: session?.status === "success",
    isError: session?.status === "error",
    transactionHash: session?.transaction_hash,
    errorMessage: session?.error_message,
    clearSessionParam,
  };
};
