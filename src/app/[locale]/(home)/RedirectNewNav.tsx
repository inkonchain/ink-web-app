"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { routing, useRouter } from "@/routing";

export const RedirectNewNav = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = useRouterQuery();

  useEffect(() => {
    if (searchParams.get("newNav")) {
      router.replace({
        pathname: routing.pathnames["/new"],
        query: {
          ...Object.fromEntries(new URLSearchParams(query) || {}),
          newNav: "true",
        },
      });
    }
  }, [query, searchParams, router]);

  return null;
};
