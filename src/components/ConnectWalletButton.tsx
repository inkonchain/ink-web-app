"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

interface ConnectWalletButtonProps {
  className?: string;
  connectLabel?: string;
  shrinkOnMobile?: boolean;
  noIcon?: boolean;
  size?: "md" | "lg";
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  className,
  connectLabel = "Connect",
  shrinkOnMobile = false,
  size = "md",
  noIcon = false,
}) => {
  return <DynamicWidget />;
};

ConnectWalletButton.displayName = "ConnectWalletButton";
