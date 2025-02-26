import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { classNames } from "@/util/classes";

const useScrollTracking = ({
  scrollRef,
  onPercent,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
  onPercent: (pct: number, px: number) => void;
}) => {
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollElement = scrollRef.current;
    const totalOverflow = scrollElement.scrollWidth - scrollElement.clientWidth;
    const scrollPosition = scrollElement.scrollLeft;
    onPercent(
      totalOverflow <= 0 ? 0 : (scrollPosition / totalOverflow) * 100,
      scrollPosition
    );
  }, [scrollRef, onPercent]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrollElement = scrollRef.current;
    window.addEventListener("resize", handleScroll);
    scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollRef, handleScroll]);
  useEffect(() => {
    if (!scrollRef.current) return;
    if (firstLoadDone) return;
    handleScroll();
    setFirstLoadDone(true);
  }, [scrollRef, handleScroll, firstLoadDone]);
};

export const ScrollWithGradient: React.FC<
  PropsWithChildren & {
    className?: string;
    onScroll?: (pct: number, px: number) => void;
  }
> = ({ className, children, onScroll: onPercent }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollTracking({
    scrollRef,
    onPercent: (pct, px) => {
      if (!scrollRef.current) return;
      onPercent?.(pct, px);
      scrollRef.current.style.setProperty(
        "--tw-gradient-from-position",
        `${Math.max(Math.min(pct + 60, 100), 80)}%`
      );
    },
  });

  return (
    <div
      className={classNames(
        "overflow-x-scroll from-80% from-white to-transparent",
        className
      )}
      ref={scrollRef}
      style={
        {
          mask: "linear-gradient(to right, var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
