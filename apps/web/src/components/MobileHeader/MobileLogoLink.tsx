"use client";

import { Disappearing } from "@/components/Disappearing";
import { AnimatedInkLogoIcon } from "@/components/icons/InkLogo";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, usePathname, useRouter } from "@/routing";
import { getAnchorWithParams } from "@/util/urls";

interface MobileLogoLinkProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scrollProps: {
    scrollMin: number;
    scrollMax: number;
  };
}

export const MobileLogoLink = ({
  isOpen,
  setIsOpen,
  scrollProps,
}: MobileLogoLinkProps) => {
  const router = useRouter();
  const query = useRouterQuery();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    setIsOpen(false);

    if (!isHomePage) {
      return false;
    }

    e.preventDefault();

    // Update URL first without scrolling
    router.push(getAnchorWithParams("#", query.toString()), { scroll: false });

    // Wait for next frame to ensure DOM update
    requestAnimationFrame(() => {
      // And then wait one more frame for safety
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  };

  return (
    <Disappearing
      className="w-fit h-fit pointer-events-auto"
      {...scrollProps}
      disabled={isOpen}
    >
      <Link
        className="flex items-center gap-2 w-fit hover:brightness-125 focus-visible:outline-none text-krakenPurple"
        href={{
          pathname: "/",
          hash: "#",
          query: query,
        }}
        onClick={handleClick}
      >
        <AnimatedInkLogoIcon />
      </Link>
    </Disappearing>
  );
};
