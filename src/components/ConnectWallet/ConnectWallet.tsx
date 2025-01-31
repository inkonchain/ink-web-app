"use client";

import React, { useEffect, useState } from "react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";
import Image from "next/image";

import { useWalletContext } from "@/contexts/wallet-context";

interface SwitchError extends Error {
  code?: number;
}

export const ConnectWallet = () => {
  const { provider, walletAddress, setProvider, setSigner, setWalletAddress } =
    useWalletContext();

  // const [walletAddress, setWalletAddress] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  const connectMetaMask = async () => {
    hideModal();
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    // These setters could be in their own function to set
    setProvider(provider);
    setSigner(signer);
    setWalletAddress(walletAddress);
  };

  const connectWalletConnect = async () => {
    hideModal();
    const provider = await EthereumProvider.init({
      projectId: "87d16ae694b7ff58f759237ec11c294a",
      metadata: {
        name: "My Website",
        description: "My Website Description",
        url: "inkonchain.com",
        icons: ["randomicon.com"],
      },
      showQrModal: true,
      optionalChains: [1, 137, 2020],

      /*Optional - Add custom RPCs for each supported chain*/
      rpcMap: {
        1: "mainnet.rpc...",
        137: "polygon.rpc...",
      },
    });
    provider.signer;

    await provider.enable();
    const web3Provider = new ethers.BrowserProvider(provider);
    const signer = await web3Provider.getSigner();
    const address = await signer.getAddress();

    setProvider(web3Provider);
    setSigner(signer);
    setWalletAddress(walletAddress);
    setWalletAddress(address);
    hideModal();
  };

  // switch these provider.send
  // TODO: how do you know which chain you are connected to? https://docs.metamask.io/wallet/reference/eth_chainid/
  async function switchNetwork() {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    let hexChainId = "0xBA5ED";
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      });
    } catch (error) {
      const switchError = error as SwitchError;
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          // Attempt to add a new network (e.g., Binance Smart Chain)
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: hexChainId, // Example: Binance Smart Chain Mainnet
                rpcUrl: "https://rpc.op-one-testnet.gelato.digital",
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add the network:", addError);
        }
      } else {
        console.error("Error switching networks:", switchError);
      }
    }
  }

  useEffect(() => {
    // TODO: initialize the provider autmoatically if they have connected before
    const initializeProvider = async () => {
      // need to check how to do it with wallet connect if it will be the same
      // probably not. something like window.ethereum.isMetamask or .isWalletConnect
      if (window.ethereum && !provider) {
        // then set it
        const provider = new ethers.BrowserProvider(window.ethereum);
        // this line is an issue
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        // These setters could be in their own function to set
        setProvider(provider);
        setSigner(signer);
        setWalletAddress(walletAddress);
        switchNetwork();
      }
    };
    initializeProvider();
  }, [provider, setProvider, setSigner, setWalletAddress]);

  return (
    <>
      {!walletAddress ? (
        <button className="open-modal-btn" onClick={showModal}>
          Connect Wallet
        </button>
      ) : (
        <p>{walletAddress}</p>
      )}
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50">
          <div>
            {/* <button className="close-modal-btn" onClick={hideModal}>
              × Close
            </button> */}
            <span>
              <h2>Connect Wallet</h2>
              <span onClick={hideModal}>×</span>
            </span>

            <button onClick={connectMetaMask}>
              <Image
                src="/MetaMask_Fox.png"
                alt="MetaMask"
                className="button-icon"
              />
              MetaMask
            </button>

            <button onClick={connectWalletConnect}>
              <Image src="/walletconnect-icon.png" alt="MetaMask" />
              WalletConnect
            </button>
          </div>
        </div>
      )}
    </>
  );
};
