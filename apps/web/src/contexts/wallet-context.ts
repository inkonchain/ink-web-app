import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  address?: `0x${string}`;
  chainId?: number;
  isConnected?: boolean;
  provider: ethers.BrowserProvider | undefined;
  signer: ethers.Signer | undefined;
  walletAddress: string | undefined;
  setProvider: Dispatch<SetStateAction<ethers.BrowserProvider | undefined>>;
  setSigner: Dispatch<SetStateAction<ethers.Signer | undefined>>;
  setWalletAddress: Dispatch<SetStateAction<string | undefined>>;
}

const defaultProviderState: WalletContextType = {
  address: undefined,
  chainId: undefined,
  isConnected: undefined,
  provider: undefined,
  signer: undefined,
  walletAddress: undefined,
  setProvider: () => {},
  setSigner: () => {},
  setWalletAddress: () => {},
};

export const WalletContext =
  createContext<WalletContextType>(defaultProviderState);

export const useWalletContext = () => useContext(WalletContext);
