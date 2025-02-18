"use client";

import { useState } from "react";
import { WebAuthnMode } from "@zerodev/passkey-validator";

import { useUsername } from "../context/UsernameContext";
import { useZeroDev } from "../context/ZerodevContext";
import { createAccountAndClient } from "../lib/zerodev";

import { Spinner } from "./Spinner";

export default function LoginButton() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { username } = useUsername();
  const {
    setKernelAccount,
    setKernelClient,
    setAccountAddress,
    setIsKernelClientReady,
  } = useZeroDev();

  const handleLogin = async () => {
    setIsLoggingIn(true);

    try {
      const { kernelAccount, kernelClient } = await createAccountAndClient(
        username || "",
        WebAuthnMode.Login
      );

      setKernelAccount(kernelAccount);
      setKernelClient(kernelClient);
      setAccountAddress(kernelAccount.address);
      setIsKernelClientReady(true);

      window.alert("Login done. Try sending UserOps.");
    } catch (error) {
      console.error("Login failed:", error);
      window.alert("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoggingIn}
      className="flex justify-center items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 w-full disabled:bg-gray-300"
    >
      {isLoggingIn ? <Spinner /> : "Login"}
    </button>
  );
}
