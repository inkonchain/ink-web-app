"use client";

import { useState } from "react";
import { encodeFunctionData, parseAbi } from "viem";

import { Button } from "@/components/Button/Button";

import { useZeroDev } from "../context/ZerodevContext";
import { contractAddress } from "../utils/constants";

import { Spinner } from "./Spinner";

// Define the ABI directly in the component to ensure correct typing
const contractABI = parseAbi([
  "function mint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
]);

export default function SendUserOp() {
  const [isSendingUserOp, setIsSendingUserOp] = useState(false);
  const [userOpStatus, setUserOpStatus] = useState("");
  const [lastMintTime, setLastMintTime] = useState(0);
  const { kernelAccount, kernelClient, isKernelClientReady } = useZeroDev();

  const MINT_COOLDOWN = 30000; // 30 seconds cooldown

  const handleSendUserOp = async () => {
    if (!kernelAccount || !kernelClient) {
      setUserOpStatus("Please connect your wallet first");
      return;
    }

    // Check cooldown
    const now = Date.now();
    const timeElapsed = now - lastMintTime;
    if (timeElapsed < MINT_COOLDOWN) {
      const remainingSeconds = Math.ceil((MINT_COOLDOWN - timeElapsed) / 1000);
      setUserOpStatus(
        `Please wait ${remainingSeconds} seconds before minting again`
      );
      return;
    }

    setIsSendingUserOp(true);
    setUserOpStatus("Preparing transaction...");

    try {
      setUserOpStatus("Encoding transaction...");
      const callData = await kernelAccount.encodeCalls([
        {
          to: contractAddress,
          value: BigInt(0),
          data: encodeFunctionData({
            abi: contractABI,
            functionName: "mint",
            args: [kernelAccount.address],
          }),
        },
      ]);

      setUserOpStatus("Sending transaction...");

      const _userOpHash = await kernelClient.sendUserOperation({
        callData,
        maxFeePerGas: BigInt(0),
        maxPriorityFeePerGas: BigInt(0),
      });

      setUserOpStatus("Waiting for confirmation...");

      await kernelClient.waitForUserOperationReceipt({
        hash: _userOpHash,
      });

      setLastMintTime(Date.now());
      setUserOpStatus(
        `NFT Minted Successfully! <a href="https://explorer-sepolia.inkonchain.com/op/${_userOpHash}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">View transaction</a>`
      );
    } catch (error) {
      console.error("Detailed UserOp error:", error);
      let errorMessage = "UserOp failed. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("429")) {
          errorMessage =
            "Too many requests. Please wait a moment before trying again.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }

      setUserOpStatus(errorMessage);
    } finally {
      setIsSendingUserOp(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant="primary"
        size="md"
        onClick={handleSendUserOp}
        disabled={
          !isKernelClientReady ||
          isSendingUserOp ||
          Date.now() - lastMintTime < MINT_COOLDOWN
        }
        className="flex items-center justify-center gap-2"
      >
        {isSendingUserOp ? (
          <>
            <Spinner /> Minting...
          </>
        ) : Date.now() - lastMintTime < MINT_COOLDOWN ? (
          "Cooling down..."
        ) : (
          "Mint NFT"
        )}
      </Button>

      {/* Always show status messages */}
      {userOpStatus && (
        <div
          className="text-sm text-center"
          dangerouslySetInnerHTML={{
            __html: userOpStatus,
          }}
        />
      )}
    </div>
  );
}
