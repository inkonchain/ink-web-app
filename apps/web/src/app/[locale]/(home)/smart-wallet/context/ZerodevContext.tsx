"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { KernelSmartAccountImplementation } from "@zerodev/sdk";
import { SmartAccount } from "viem/account-abstraction";

interface ZeroDevContextType {
  kernelAccount: SmartAccount<KernelSmartAccountImplementation> | null;
  setKernelAccount: (
    account: SmartAccount<KernelSmartAccountImplementation>
  ) => void;
  kernelClient: any;
  setKernelClient: (client: any) => void;
  accountAddress: string;
  setAccountAddress: (address: string) => void;
  isKernelClientReady: boolean;
  setIsKernelClientReady: (ready: boolean) => void;
}

const ZeroDevContext = createContext<ZeroDevContextType | undefined>(undefined);

export function ZeroDevProvider({ children }: { children: ReactNode }) {
  const [kernelAccount, setKernelAccount] =
    useState<SmartAccount<KernelSmartAccountImplementation> | null>(null);
  const [kernelClient, setKernelClient] = useState<any>(null);
  const [accountAddress, setAccountAddress] = useState("");
  const [isKernelClientReady, setIsKernelClientReady] = useState(false);

  return (
    <ZeroDevContext.Provider
      value={{
        kernelAccount,
        setKernelAccount,
        kernelClient,
        setKernelClient,
        accountAddress,
        setAccountAddress,
        isKernelClientReady,
        setIsKernelClientReady,
      }}
    >
      {children}
    </ZeroDevContext.Provider>
  );
}

export function useZeroDev() {
  const context = useContext(ZeroDevContext);
  if (context === undefined) {
    throw new Error("useZeroDev must be used within a ZeroDevProvider");
  }
  return context;
}
