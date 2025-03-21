"use client";

import { FC } from "react";
import { InkIcon } from "@inkonchain/ink-kit";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import { useAddressVerificationStatus } from "@/hooks/useAddressVerificationStatus";
import { cn } from "@/lib/utils";
import { Link } from "@/routing";

export const VerifiedBadge: FC = () => {
  const t = useTranslations("Verify");
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  const { data: verificationStatus } = useAddressVerificationStatus(address);

  // Hide badge if user is not connected
  if (!isConnected) return null;

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Link
            href={{
              pathname: "/verify",
              query: searchParams.toString(),
            }}
            className={cn(
              "group flex items-center justify-center rounded-full p-1 transition-all duration-200",
              verificationStatus?.isVerified
                ? "hover:bg-inkSuccess"
                : "hover:bg-default/8"
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
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="rounded-xl bg-default/6 px-3 py-2 text-md backdrop-blur-md font-medium text-default/90"
            sideOffset={15}
          >
            {verificationStatus?.isVerified
              ? t("badge.verified")
              : t("badge.getVerified")}
            <Tooltip.Arrow className="fill-background/80" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
