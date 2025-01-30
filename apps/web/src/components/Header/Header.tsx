import { MobileMenuContent } from "@/components/MobileMenu/MobileMenuContent";

import { LogoLink } from "../LogoLink";
import { MobileHeader } from "../MobileHeader";

import { HeaderConnectWallet } from "./HeaderConnectWallet";

export interface HeaderProps {
  children?: React.ReactNode;
  mobileChildren?: React.ReactNode;
}

// Keep the main Header component as a Server Component
export const Header = ({ children, mobileChildren }: HeaderProps) => {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex-col justify-center gap-4 select-none mx-0 hidden lg:flex">
        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 px-10 pt-8 mt-0.5">
          <div className="flex items-center justify-start">
            <LogoLink />
          </div>
          <div className="flex-1">{children}</div>
          <div className="flex items-center justify-end">
            <HeaderConnectWallet />
          </div>
        </div>
      </div>

      <MobileHeader>
        <MobileMenuContent>{mobileChildren}</MobileMenuContent>
      </MobileHeader>
    </>
  );
};
