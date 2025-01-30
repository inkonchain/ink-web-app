"use client";

import { PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { useWallet } from "@/contexts/WalletProvider";
import { NEXT_PUBLIC_FAUCET_API_URL } from "@/env-client";
import { useFaucetInfoAndCaptcha } from "@/hooks/useFaucetInfoAndHCaptcha";

export interface FaucetButtonProps extends PropsWithChildren {
  onChange: (value: boolean | null) => void;
}

export const FaucetButton: React.FC<FaucetButtonProps> = ({ onChange }) => {
  const { address, chainId, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);

  const { hcaptchaLoaded, executeHCaptcha } = useFaucetInfoAndCaptcha(chainId);

  if (!isConnected || !address) return null;

  const handleRequest = async () => {
    setLoading(true);
    await onChange(null);

    try {
      // Check rate limit first
      const rateLimitRes = await fetch(
        `${NEXT_PUBLIC_FAUCET_API_URL}/api/check-rate-limit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address, chainId }),
        }
      );

      if (!rateLimitRes.ok) {
        const errorData = await rateLimitRes.json();
        throw new Error(errorData.message || "Rate limit check failed");
      }

      const rateLimitData = await rateLimitRes.json();

      if (!rateLimitData.allowed) {
        toast.error(`${rateLimitData.message}`);
        return;
      }

      // If not rate limited, proceed with captcha verification
      let hcaptchaToken = undefined;
      if (hcaptchaLoaded) {
        try {
          hcaptchaToken = await executeHCaptcha();
        } catch (error) {
          console.error("hCaptcha execution error:", error);
          toast.error("Failed to verify captcha");
          return;
        }
      } else {
        console.warn("hCaptcha not loaded or not ready");
        toast.warning("hCaptcha not ready. Please try again.");
        return;
      }

      // If captcha is solved, proceed with the claim
      const res = await fetch(`${NEXT_PUBLIC_FAUCET_API_URL}/api/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, chainId, hcaptchaToken }),
      });

      const responseData = await res.json();

      await onChange(true);
      res.ok
        ? toast.success(`🎉 Testnet ETH successfully claimed! Enjoy!`)
        : toast.error(`${responseData.message}`);
    } catch (error) {
      console.error("Request error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }

      await onChange(false);
      toast.error(
        `${error instanceof Error ? error.message : "❌ Failed to claim testnet ETH. Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        animate={
          loading ? { y: [0, -5, 5, -5, 5, -5, 5, 0] } : { scale: [1, 1.1, 1] }
        }
        className={`bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 py-4 rounded-full text-2xl font-extrabold shadow-lg hover:shadow2xl ${loading ? `opacity-50 cursor-not-allowed` : ``}`}
        disabled={loading}
        onClick={handleRequest}
        transition={{
          duration: loading ? 0.5 : 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {loading ? `Requesting...` : `🚀 Get Testnet ETH Now! 🚀`}
      </motion.button>
      <div id="hcaptcha-container" style={{ display: "none" }}></div>
    </>
  );
};
