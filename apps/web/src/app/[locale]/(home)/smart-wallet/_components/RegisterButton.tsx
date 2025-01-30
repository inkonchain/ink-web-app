"use client";

import { useState } from "react";
import { WebAuthnMode } from "@zerodev/passkey-validator";

import { useUsername } from "../context/UsernameContext";
import { useZeroDev } from "../context/ZerodevContext";
import { createAccountAndClient } from "../lib/zerodev";

import { Spinner } from "./Spinner";

export default function RegisterButton() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { username } = useUsername();
  const {
    setKernelAccount,
    setKernelClient,
    setAccountAddress,
    setIsKernelClientReady,
  } = useZeroDev();

  const handleRegister = async () => {
    if (!username) return;
    setIsRegistering(true);

    try {
      const { kernelAccount, kernelClient } = await createAccountAndClient(
        username,
        WebAuthnMode.Register
      );

      setKernelAccount(kernelAccount);
      setKernelClient(kernelClient);
      setAccountAddress(kernelAccount.address);
      setIsKernelClientReady(true);

      window.alert("Register done. Try sending UserOps.");
    } catch (error) {
      console.error("Registration failed:", error);
      window.alert("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <button
      onClick={handleRegister}
      disabled={isRegistering || !username}
      className="flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full disabled:bg-gray-300"
    >
      {isRegistering ? <Spinner /> : "Register"}
    </button>
  );
}
