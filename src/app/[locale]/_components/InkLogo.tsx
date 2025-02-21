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
        pathname: routing.pathnames["/"],
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
    <>
      <Image
        src="/logo/ink-mark-light.webp"
        alt="Ink Logo"
        width={40}
        height={40}
        className="dark:hidden"
      />
      <Image
        src="/logo/ink-mark-dark.webp"
        alt="Ink Logo"
        width={40}
        height={40}
        className="hidden dark:block"
      />
    </>
  );
};
