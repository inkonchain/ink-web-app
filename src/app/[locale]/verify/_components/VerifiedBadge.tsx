"use client";
import { InkIcon } from "@inkonchain/ink-kit";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

import { useAddressVerificationStatus } from "@/hooks/useAddressVerificationStatus";
import { cn } from "@/lib/utils";
import { Link } from "@/routing";

interface VerifiedBadgeProps {
  className?: string;
}

export const VerifiedBadge = ({ className }: VerifiedBadgeProps) => {
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  const { data: verificationStatus } = useAddressVerificationStatus(address);

  // Hide badge if user is not connected
  if (!isConnected) return null;

  return (
    <Link
      href={{
        pathname: "/verify",
        query: searchParams.toString(),
      }}
      className={cn(
        "group flex items-center justify-center rounded-full p-1 transition-all duration-200",
        verificationStatus?.isVerified
          ? "hover:bg-inkSuccess"
          : "hover:bg-default/8",
        className
      )}
    >
      <div
        className={cn(
          "size-8 flex items-center justify-center transition-all duration-200",
          verificationStatus?.isVerified ? "group-hover:text-white" : ""
        )}
      >
        <InkIcon.VerifiedIcon className="size-5" />
      </div>
    </Link>
  );
};

VerifiedBadge.displayName = "VerifiedBadge";
