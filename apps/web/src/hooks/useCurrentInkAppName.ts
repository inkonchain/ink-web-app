import { useMemo } from "react";
import { usePathname } from "next/navigation";

export function useCurrentInkAppName() {
  const pathname = usePathname();
  return useMemo(() => {
    if (pathname.endsWith("/testnet-bridge")) {
      return "Ink Testnet Bridge";
    }
    if (pathname.endsWith("/faucet")) {
      return "Ink Sepolia Faucet";
    }
    return "Ink Landing Page";
  }, [pathname]);
}
