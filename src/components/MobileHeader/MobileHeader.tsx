"use client";

import React, { PropsWithChildren } from "react";
import FocusLock from "react-focus-lock";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { MobileMenuButton } from "@/components/MobileMenu";
import { useMobileMenuContext } from "@/components/MobileMenu/MobileMenuContext";
import { usePathname } from "@/routing";

import { HeaderContent } from "../Header/HeaderContent";
import { OnlyWithFeatureFlag } from "../OnlyWithFeatureFlag";

import { MobileLogoLink } from "./MobileLogoLink";

export interface MobileHeaderProps extends PropsWithChildren {}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ children }) => {
  const { isOpen, setIsOpen } = useMobileMenuContext();
  const pathname = usePathname();

  // Define routes where header should not be sticky
  const nonStickyRoutes = ["/testnet-bridge", "/faucet"];
  const isNonStickyRoute = nonStickyRoutes.includes(pathname);

  const scrollProps = {
    scrollMin: 0,
    scrollMax: 200,
  };

  return (
    <FocusLock disabled={!isOpen}>
      <div
        className={`left-0 right-0 top-0 lg:hidden z-50 pointer-events-none ${isNonStickyRoute ? "absolute" : "fixed"}`}
      >
        <div className="p-8 pb-0 flex justify-between gap-8 items-center">
          <MobileLogoLink
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            scrollProps={scrollProps}
          />

          <div className="flex items-center gap-2.5 pointer-events-auto">
            <OnlyWithFeatureFlag
              flag="mainnet"
              otherwise={<ConnectWalletButton />}
            >
              <HeaderContent />
            </OnlyWithFeatureFlag>
            <MobileMenuButton />
          </div>
        </div>
      </div>

      {isOpen ? children : null}
    </FocusLock>
  );
};
