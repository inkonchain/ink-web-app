"use client";
import React, { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";

import { useCallbackWhenVisible } from "@/hooks/useCallbackWhenVisible";
import { Anchors, useRouter } from "@/routing";
import { classNames } from "@/util/classes";
import { getAnchorWithParams } from "@/util/urls";

export interface AnchorIntoViewProps extends PropsWithChildren {
  anchor: Anchors;
}

export const AnchorIntoView: React.FC<AnchorIntoViewProps> = ({
  anchor,
  children,
}) => {
  const anchorWithoutHashAndSlash = anchor.substring(2);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { ref } = useCallbackWhenVisible<HTMLDivElement>({
    callback: () => {
      if (typeof window !== undefined && window.location.hash !== anchor) {
        const params = searchParams.toString();
        router.replace(getAnchorWithParams(anchor, params), {
          scroll: false,
        });
      }
    },
  });

  return (
    <div className="relative" ref={ref}>
      <div
        id={anchorWithoutHashAndSlash}
        className={classNames("absolute -top-5 invisible pointer-events-none")}
      >
        &nbsp;
      </div>
      {children}
    </div>
  );
};
