"use client";

import { AnimatedInkLogoIcon } from "@/components/icons/InkLogo";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link, usePathname, useRouter } from "@/routing";
import { getAnchorWithParams } from "@/util/urls";

export const LogoLink = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const query = useRouterQuery();

  const scrollToHash = (hash: string) => {
    if (typeof window === "undefined") return false;

    if (!isHomePage) {
      return false;
    }

    const element =
      hash === "#" ? document.documentElement : document.querySelector(hash);

    if (!element) return false;

    // If we're already at this hash, just scroll
    if (window.location.hash === hash) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }

    // Update URL first without scrolling
    router.push(getAnchorWithParams(hash, query.toString()), { scroll: false });

    // Wait for next frame to ensure DOM update
    requestAnimationFrame(() => {
      // And then wait one more frame for safety
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth" });
      });
    });

    return true;
  };

  return (
    <Link
      className="flex gap-2 w-fit px-2 py-1"
      href={{
        pathname: "/",
        hash: "#",
        query: query,
      }}
      onClick={(e) => {
        if (scrollToHash("#")) {
          e.preventDefault();
        }
      }}
    >
      <AnimatedInkLogoIcon />
    </Link>
  );
};
