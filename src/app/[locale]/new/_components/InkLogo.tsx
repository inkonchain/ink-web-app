"use client";

import { useInkLayoutContext } from "@inkonchain/ink-kit";
import Image from "next/image";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, routing } from "@/routing";

export const InkLogo: React.FC = () => {
  const { setIsMobileNavOpen } = useInkLayoutContext();

  function closeMobileNavigation() {
    setIsMobileNavOpen(false);
  }

  const query = useRouterQuery();
  return (
    <Link
      href={{
        pathname: routing.pathnames["/new"],
        query,
      }}
      onClick={closeMobileNavigation}
    >
      <InkLogoImage />
    </Link>
  );
};

export const InkLogoImage: React.FC = () => {
  return (
    <Image src="/logo/ink-mark.png?1" alt="Ink Logo" width={40} height={40} />
  );
};
