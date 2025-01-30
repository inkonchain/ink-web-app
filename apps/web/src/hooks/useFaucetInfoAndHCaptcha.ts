import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { NEXT_PUBLIC_FAUCET_API_URL } from "@/env-client";

import { useHCaptcha } from "./useHCaptcha";

export interface FaucetInfo {
  account: string;
  payout: string;
  symbol: string;
  hcaptcha_sitekey: string;
}

const initialFaucetInfo: FaucetInfo = {
  account: "0x0000000000000000000000000000000000000000",
  payout: "1",
  symbol: "ETH",
  hcaptcha_sitekey: "",
};

export function useFaucetInfoAndCaptcha(chainId: number | undefined) {
  const [faucetInfo, setFaucetInfo] = useState<FaucetInfo>(initialFaucetInfo);
  const [hcaptchaReady, setHcaptchaReady] = useState(false);

  const fetchFaucetInfo = useCallback(async () => {
    try {
      console.trace("Fetching faucet info for network:", chainId);
      const res = await fetch(`${NEXT_PUBLIC_FAUCET_API_URL}/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chainId }),
      });
      if (res.ok) {
        const newFaucetInfo = await res.json();
        console.trace("New faucet info:", newFaucetInfo);
        setFaucetInfo(newFaucetInfo);
        setHcaptchaReady(true);
      } else {
        setFaucetInfo(initialFaucetInfo);
        setHcaptchaReady(false);
      }
    } catch (error) {
      console.error("Error fetching faucet info:", error);
      toast.error("Failed to fetch faucet information");
    }
  }, [chainId]);

  useEffect(() => {
    fetchFaucetInfo();
  }, [fetchFaucetInfo]);

  const { hcaptchaLoaded, executeHCaptcha } = useHCaptcha(
    faucetInfo.hcaptcha_sitekey,
    hcaptchaReady
  );

  return { hcaptchaLoaded, executeHCaptcha };
}
