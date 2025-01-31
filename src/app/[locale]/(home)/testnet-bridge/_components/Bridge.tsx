"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { parseEther } from "viem";
import { Hash } from "viem";
import {
  useAccount,
  useBalance,
  useEstimateFeesPerGas,
  usePrepareTransactionRequest,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import { ConnectWalletButton } from "@/app/[locale]/_components/ConnectWalletButton";
import { useBridgeTransactionModal } from "@/app/[locale]/(home)/testnet-bridge/_components/BridgeTransactionModal";
import { Button } from "@/components/Button/Button";
import { ColoredText } from "@/components/ColoredText";
import { Loader } from "@/components/Loader";
import { containerClasses } from "@/components/styles/container";
import { classNames } from "@/util/classes";

const BRIDGE_CONTRACT_ADDRESS = "0x33f60714bbd74d62b66d79213c348614de51901c";

export function Bridge() {
  const t = useTranslations("Bridge");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState<string>("...");
  const [ethPrice, setEthPrice] = useState<string | null>(null);

  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const { setIsOpen: setIsBridgeTransactionModalOpen, setTxHash } =
    useBridgeTransactionModal();

  const isCorrectNetwork = chain?.id === sepolia.id;
  const isWrongNetwork = isConnected && !isCorrectNetwork;

  const [networkError, setNetworkError] = useState<string>("");

  const { data: balance } = useBalance({
    address,
  });

  usePrepareTransactionRequest(
    amount
      ? {
          to: BRIDGE_CONTRACT_ADDRESS,
          data: "0x",
          chainId: sepolia.id,
        }
      : undefined
  );

  const { sendTransaction } = useSendTransaction({
    mutation: {
      onMutate: () => {
        setIsProcessing(true);
        setError("");
        setNetworkError("");
      },
      onError: (error) => {
        setStatus(`error:${error.message}`);
        setIsProcessing(false);
        setError(error.message);

        if (
          error.message.includes("User denied transaction") ||
          error.message.includes("User rejected")
        ) {
          setIsProcessing(false);
          setError(
            "Transaction was rejected. Click 'Bridge funds' to try again."
          );
        }
      },
      onSuccess: (hash: Hash) => {
        if (hash) {
          setStatus(`success:${hash}`);
          setIsBridgeTransactionModalOpen(true);
          setTxHash(hash);
          setAmount("");
        } else {
          console.error("Unexpected transaction response:", hash);
          setStatus(
            `error:Unable to get transaction hash. Please check your wallet for transaction status.`
          );
        }
        setIsProcessing(false);
      },
    },
  });

  const { data: feeEstimate } = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });

  useEffect(() => {
    if (!feeEstimate) return;

    try {
      const feePerGas = feeEstimate.maxFeePerGas || feeEstimate.gasPrice;
      if (!feePerGas) {
        throw new Error("Could not estimate fee");
      }

      const gasLimit = BigInt(21000);
      const totalFeeWei = feePerGas * gasLimit;

      const totalFeeEth = (Number(totalFeeWei) / 1e18) * 100;

      setEstimatedFee(totalFeeEth.toFixed(6));
    } catch {
      setEstimatedFee("...");
    }
  }, [feeEstimate]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`/api/eth-price`);
        const data = await response.json();
        if (data.price) {
          setEthPrice(data.price);
        }
      } catch {
        // Silently fail
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const transferEth = async () => {
    try {
      setError("");
      setNetworkError("");

      if (!amount || parseFloat(amount) <= 0) {
        setError("Please enter an amount greater than 0");
        return;
      }

      if (!chain) {
        throw new Error(
          "Unable to detect network. Please check your wallet connection."
        );
      }

      if (chain.id !== sepolia.id) {
        setNetworkError(
          `Please switch to Sepolia network (current: ${chain.name || "Unknown"})`
        );
        try {
          await switchChain({ chainId: sepolia.id });
        } catch (switchError) {
          throw new Error(
            "Failed to switch network. Please switch manually in your wallet."
          );
        }
        return;
      }

      if (!sendTransaction) {
        throw new Error("Failed to prepare transaction");
      }

      const transactionRequest = {
        to: BRIDGE_CONTRACT_ADDRESS as `0x${string}`,
        value: parseEther(amount),
        chainId: sepolia.id,
      };

      await sendTransaction(transactionRequest);
    } catch (error: any) {
      console.error("Bridge transfer error:", error);
      const errorMessage = error?.message || "Unknown error occurred";

      if (
        errorMessage.includes("User denied transaction") ||
        errorMessage.includes("User rejected")
      ) {
        setError(
          "Transaction was rejected. Click 'Bridge funds' to try again."
        );
      } else {
        setError(errorMessage);
      }

      setIsProcessing(false);
    }
  };

  const formatStatus = (status: string) => {
    if (!status) return null;

    if (status.startsWith("error:")) {
      return (
        <div className="flex items-center gap-2 text-red-800 bg-white/80 dark:bg-white/90 px-4 py-2 rounded-lg">
          <span>Error:</span>
          <span className="truncate max-w-[300px]">
            {status.replace("error:", "")}
          </span>
        </div>
      );
    }

    return null;
  };

  const renderActionButton = () => {
    if (!isConnected) {
      return (
        <ConnectWalletButton className="w-full font-bold text-xl py-4 mt-2" />
      );
    }

    if (isWrongNetwork) {
      return (
        <Button
          variant="primary"
          size="lg"
          className="w-full font-bold text-xl py-4 mt-2"
          onClick={() => switchChain({ chainId: sepolia.id })}
        >
          Switch to Sepolia
        </Button>
      );
    }

    const isDisabled =
      isProcessing || (!amount && !error?.includes("rejected"));

    return (
      <Button
        variant="primary"
        size="lg"
        className={classNames(
          "w-full font-bold text-xl py-4 mt-2",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={transferEth}
        disabled={isDisabled}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <Loader />
            Processing...
          </div>
        ) : (
          "Bridge funds"
        )}
      </Button>
    );
  };

  const renderNetworkError = () => {
    if (networkError) {
      return (
        <div className="text-red-500 text-sm mt-2 text-center">
          {networkError}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-col items-center sm:pt-32 pt-2">
        <div className="flex flex-col items-center sm:justify-center sm:gap-10 gap-6 flex-1">
          <div className="flex flex-col items-center gap-[calc(clamp(1rem,min(5vw+1rem,2vh),200px)/3)]">
            <div id="bridge" className={containerClasses()}>
              <div
                className={classNames(
                  "rounded-3xl sm:px-12 px-6 py-4 sm:py-6 inline-block mx-auto w-full sm:min-w-[700px]",
                  "[.light_&]:bg-[#EDF1F9]/50",
                  "dark:bg-[#160F1F]"
                )}
              >
                <div className="flex flex-col gap-[6px]">
                  <div className="text-center flex flex-col items-center">
                    <ColoredText
                      variant="purple"
                      className={classNames(
                        "sm:text-4xl text-3xl mb-2 leading-normal",
                        "dark:hidden"
                      )}
                    >
                      {t("title")}
                    </ColoredText>
                    <ColoredText
                      variant="white-to-gray"
                      className={classNames(
                        "sm:text-4xl text-3xl mb-2 leading-normal",
                        "hidden dark:block"
                      )}
                    >
                      {t("title")}
                    </ColoredText>
                    {formatStatus(status) && (
                      <div className="mt-4 flex justify-center text-base">
                        {formatStatus(status)}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between relative flex-row gap-2">
                      <div className="flex flex-col gap-2 w-full sm:flex-1">
                        <span className="text-base text-gray-700 dark:text-white/50 font-medium pl-4">
                          From
                        </span>
                        <div className="bg-white rounded-xl py-4 px-3 sm:py-6 sm:px-4 w-full">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Image
                              src="/icons/ethereum.svg"
                              alt="Ethereum"
                              width={28}
                              height={28}
                              className="sm:w-8 sm:h-8"
                            />
                            <ColoredText
                              variant="purple"
                              className={classNames(
                                "font-medium text-lg sm:text-xl truncate",
                                "dark:hidden"
                              )}
                            >
                              Sepolia
                            </ColoredText>
                            <ColoredText
                              variant="purple-dark"
                              className={classNames(
                                "font-medium text-lg sm:text-xl truncate",
                                "hidden dark:block"
                              )}
                            >
                              Sepolia
                            </ColoredText>
                          </div>
                        </div>
                      </div>

                      <div
                        className="trade-direction rounded-full absolute left-1/2 top-[calc(50%+16px)] -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#F6F5FD",
                          border: "6px solid #DBD6F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 4L7.5 8L4 12"
                            stroke="rgba(0, 0, 0, 0.5)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.5 4L12 8L8.5 12"
                            stroke="rgba(0, 0, 0, 0.5)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div className="flex flex-col gap-2 w-full sm:flex-1">
                        <span className="text-base text-gray-700 dark:text-white/50 font-medium pl-4">
                          To
                        </span>
                        <div className="bg-white rounded-xl py-4 px-3 sm:py-6 sm:px-4 w-full">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Image
                              src="/icons/ink-sepolia-logo.svg"
                              alt="Ink"
                              width={28}
                              height={28}
                              className="sm:w-8 sm:h-8"
                            />
                            <ColoredText
                              variant="purple"
                              className={classNames(
                                "font-medium text-lg sm:text-xl truncate",
                                "dark:hidden"
                              )}
                            >
                              Ink Sepolia
                            </ColoredText>
                            <ColoredText
                              variant="purple-dark"
                              className={classNames(
                                "font-medium text-lg sm:text-xl truncate",
                                "hidden dark:block"
                              )}
                            >
                              Ink Sepolia
                            </ColoredText>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="bg-white rounded-xl p-3 shadow-sm w-full cursor-pointer"
                      onClick={() =>
                        document.getElementById("amount-input")?.focus()
                      }
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <input
                            id="amount-input"
                            type="number"
                            placeholder="0"
                            className={`dark:bg-white text-black w-full outline-none text-4xl font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${error ? "border-red-500 border-b" : ""}`}
                            min="0"
                            step="any"
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                              setError("");
                            }}
                          />
                          <div
                            className="flex items-center gap-2 rounded-full px-4 py-2 flex-shrink-0 ml-4"
                            style={{
                              backgroundColor: "rgba(221, 220, 240, 0.75)",
                            }}
                          >
                            <Image
                              src="/icons/ethereum.svg"
                              alt="ETH"
                              width={30}
                              height={30}
                            />
                            <span className="text-base dark:text-gray-800">
                              ETH
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="text-base text-gray-700 font-medium">
                            $
                            {amount && ethPrice
                              ? (
                                  parseFloat(amount) * parseFloat(ethPrice)
                                ).toFixed(2)
                              : "0.00"}
                          </span>
                          {balance && (
                            <span className="text-base text-gray-500 break-all">
                              Balance: {Number(balance?.formatted).toFixed(4)}{" "}
                              {balance?.symbol}
                            </span>
                          )}
                        </div>
                        {error && (
                          <span className="text-red-500 text-sm">{error}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center px-2 mt-3 text-gray-600 dark:text-white/50 text-sm">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/icons/clock-small.svg"
                          alt="Transfer time"
                          width={16}
                          height={16}
                          className="dark:invert dark:opacity-50"
                        />
                        <span>
                          Transfer time:{" "}
                          <span className="font-bold">~3 mins</span>
                        </span>
                      </div>
                      {estimatedFee !== "..." && (
                        <div>
                          Estimated fee:{" "}
                          <span className="font-bold">{estimatedFee} ETH</span>
                        </div>
                      )}
                    </div>

                    {renderNetworkError()}
                    {renderActionButton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
