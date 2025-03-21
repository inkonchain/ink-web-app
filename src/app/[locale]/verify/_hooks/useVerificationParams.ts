import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useVerificationParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const clearStatusParams = useCallback(() => {
    const verifyPage = searchParams.get("verifyPage") ? "?verifyPage=true" : "";
    router.replace(window.location.pathname + verifyPage, { scroll: false });
  }, [router, searchParams]);

  return {
    status: searchParams.get("status"),
    message: searchParams.get("message"),
    txHash: searchParams.get("txHash"),
    clearStatusParams,
  };
};
