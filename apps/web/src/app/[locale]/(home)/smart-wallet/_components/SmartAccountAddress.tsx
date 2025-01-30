"use client";

import { useZeroDev } from "../context/ZerodevContext";

export function SmartAccountAddress() {
  const { accountAddress } = useZeroDev();

  if (!accountAddress) return null;

  return (
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
  );
}
