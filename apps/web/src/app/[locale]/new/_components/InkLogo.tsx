"use client";

import Image from "next/image";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, routing } from "@/routing";

export const InkLogo: React.FC = () => {
  const query = useRouterQuery();
  return (
    <Link
      href={{
        pathname: routing.pathnames["/new"],
        query,
      }}
    >
      <InkLogoImage />
    </Link>
  );
};

export const InkLogoImage: React.FC = () => {
  return (
    <Image src="/logo/ink-mark.png" alt="Ink Logo" width={40} height={40} />
  );
};
