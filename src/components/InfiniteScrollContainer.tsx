"use client";

import { useEffect, useRef } from "react";

import { classNames } from "@/util/classes";

interface InfiniteScrollContainerProps {
  onLoadMore: () => void;
  hasMore: boolean;
  children: React.ReactNode;
  className?: string;
}

export function InfiniteScrollContainer({
  onLoadMore,
  hasMore,
  children,
  className,
}: InfiniteScrollContainerProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasMore, onLoadMore, loadMoreRef]);

  return (
    <div className={classNames("relative", className)}>
      {children}
      <div className="h-0 absolute bottom-12" ref={loadMoreRef} />
    </div>
  );
}
