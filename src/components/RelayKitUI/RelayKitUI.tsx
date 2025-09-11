"use client";
import { useState } from "react";
import { InkIcon } from "@inkonchain/ink-kit";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { SwapWidget } from "@reservoir0x/relay-kit-ui";
import { adaptViemWallet } from "@reservoir0x/relay-sdk";
import { useAccount, useWalletClient } from "wagmi";

import { RelayLogo } from "@/components/icons/RelayLogo";

import "@reservoir0x/relay-kit-ui/styles.css";
import "./RelayKitUI.css";

export const RelayKitUI: React.FC = () => {
  const { openConnectModal } = useConnectModal();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const [fromToken, setFromToken] = useState({
    chainId: 1,
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    logoURI: "https://assets.relay.link/icons/1/light.png",
  });

  const [toToken, setToToken] = useState({
    chainId: 57073,
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    logoURI: "https://inkonchain.com/icon.svg",
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-4 p-6 pt-5">
        <div className="flex justify-end items-center h-4">
          {walletClient && (
            <a
              href={`https://relay.link/transactions?address=${walletClient.account.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InkIcon.History className="size-6 hover:opacity-70" />
            </a>
          )}
        </div>
        <SwapWidget
          key={address}
          wallet={walletClient ? adaptViemWallet(walletClient) : undefined}
          fromToken={fromToken}
          setFromToken={(token) => token && setFromToken(token)}
          toToken={toToken}
          setToToken={(token) => token && setToToken(token)}
          defaultAmount="0"
          defaultToAddress={walletClient?.account.address}
          supportedWalletVMs={["evm"]}
          onConnectWallet={openConnectModal}
          onSwapError={(error) => {
            console.error("Swap error:", error);
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-blackMagic/50 dark:text-white/50 text-xs">
          Bridge powered by
        </span>
        <RelayLogo />
      </div>
    </div>
  );
};

RelayKitUI.displayName = "RelayKitUI";
