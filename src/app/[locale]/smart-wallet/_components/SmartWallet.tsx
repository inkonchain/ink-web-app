"use client";

import { useEffect, useState } from "react";
import { WebAuthnMode } from "@zerodev/passkey-validator";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/Button/Button";
import { ColoredText } from "@/components/ColoredText";

import { useUsername } from "../context/UsernameContext";
import { useZeroDev } from "../context/ZerodevContext";
import { createAccountAndClient } from "../lib/zerodev";

import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import SendUserOp from "./SendUserOp";
import { Spinner } from "./Spinner";
import UsernameInput from "./UsernameInput";

export function SmartWallet() {
  const t = useTranslations("SmartWallet");

  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    accountAddress,
    setKernelAccount,
    setKernelClient,
    setAccountAddress,
    setIsKernelClientReady,
  } = useZeroDev();

  const { username, setUsername } = useUsername();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateWallet = async () => {
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
      setIsModalOpen(false);

      window.alert("Smart wallet created successfully!");
    } catch (error) {
      console.error("Registration failed:", error);
      window.alert("Failed to create smart wallet. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

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

      window.alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      window.alert("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Header */}
      <ColoredText
        className="text-center text-5xl sm:text-6xl font-medium"
        variant="purple"
      >
        Ink Labs
      </ColoredText>

      {/* Subtitle */}
      <ColoredText
        className="text-center text-xl sm:text-2xl"
        variant="purple"
        dampen="md"
      >
        Give Ink chain a try by minting a mystery NFT into a smart wallet
      </ColoredText>

      {/* Cards Container */}
      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-[1200px] px-4">
        {/* Create Smart Wallet Card */}
        <div className="flex-1 bg-white/50 dark:bg-white/10 rounded-3xl p-8 flex flex-col items-center">
          <div className="w-[300px] h-[300px] relative mb-8">
            <Image
              src="/WalletIllustrationLight.png"
              alt="Smart Wallet"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Account Address Display */}
          {accountAddress ? (
            <div className="text-center mb-4 px-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Your Smart Wallet:
              </p>
              <a
                href={`https://explorer-sepolia.inkonchain.com/address/${accountAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 break-all"
              >
                {accountAddress}
              </a>
            </div>
          ) : (
            <>
              <div className="w-fit">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsModalOpen(true)}
                >
                  {t("createWallet")}
                </Button>
              </div>

              {/* Login Button - Only shown when not connected */}
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="text-sm text-blue-500 hover:text-blue-700 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Logging in...
                  </span>
                ) : (
                  t("alreadyCreated")
                )}
              </button>
            </>
          )}
        </div>

        {/* Mint NFT Card */}
        <div className="flex-1 bg-white/50 dark:bg-white/10 rounded-3xl p-8 flex flex-col items-center">
          <div className="w-[300px] h-[300px] relative mb-8">
            <Image
              src="/NFTIllustrationLight.png"
              alt="Mint NFT"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <SendUserOp />
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-center text-gray-600 dark:text-gray-400">
        {t("noGas")}
      </p>

      <main className="flex items-center justify-center min-h-screen px-4 py-24 hidden">
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-4xl font-semibold text-center mb-12">
            Ink Sepolia
          </h1>

          <div className="space-y-4">
            {/* Account Address Display */}
            {accountAddress && (
              <div className="text-center mb-4">
                Account address:{" "}
                <a
                  href={`https://explorer-sepolia.inkonchain.com/address/${accountAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {accountAddress}
                </a>
              </div>
            )}

            {/* Username Input */}
            <UsernameInput />

            {/* Register and Login Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <RegisterButton />
              <div className="mt-2 sm:mt-0">
                <LoginButton />
              </div>
            </div>

            {/* Send UserOp Button */}
            <SendUserOp />
          </div>
        </div>
      </main>

      {/* Create Wallet Modal - simplified to only handle creation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Create Smart Wallet</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Choose a username for your wallet
                </label>
                <input
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="spotlight"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCreateWallet}
                  disabled={isRegistering || !username}
                  className="flex items-center justify-center gap-2"
                >
                  {isRegistering ? (
                    <>
                      <Spinner /> Creating...
                    </>
                  ) : (
                    "Create Wallet"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
