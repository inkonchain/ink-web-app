import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import { NoisyContainer } from "@/components/Noisy";
import { classNames } from "@/util/classes";

import { AppLinks } from "./AppLinks";
import { InkApp, InkAppNetwork, mainUrl } from "./InkApp";
import { TableRowPill } from "./TableRowPill";

export const AppsTable: React.FC<{
  apps: InkApp[];
  noAppsFound: React.ReactNode;
  network: InkAppNetwork;
}> = ({ apps, noAppsFound, network }) => {
  const [maskViaPercent, setMaskViaPercent] = useState(0);

  const onScrollPercent = useCallback((pct: number, px: number) => {
    setMaskViaPercent(px > 0 ? px + 16 : px);
  }, []);

  return (
    <div className="backdrop-blur-sm bg-featuredCardPurple pb-4 rounded-2xl w-full relative">
      {apps.length === 0 ? (
        <div className="min-h-[300px] flex flex-col gap-4 justify-center items-center">
          {noAppsFound}
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <ScrollWithGradient onScroll={onScrollPercent}>
            <table className="min-w-[640px] w-full gap-2 border-separate border-spacing-x-0 border-spacing-y-px">
              <thead>
                <tr className="text-sm font-bold text-blackMagic/50 dark:text-whiteMagic/50 *:py-3">
                  <th className="pl-4 text-left w-10 sticky left-0 z-10">
                    App
                  </th>
                  <th />
                  <th className="text-right px-2">Tags</th>
                  <th className="pr-4 text-right min-w-24">Links</th>
                </tr>
              </thead>
              <tbody className="text-label text-blackMagic dark:text-whiteMagic gap-2">
                {apps.length === 0 && (
                  <tr>
                    <td colSpan={4}></td>
                  </tr>
                )}
                {apps.map((app) => (
                  <tr
                    className="*:py-4 *:border-t-2 *:border-whiteMagic/10 hover:bg-whiteMagic/5 transition-colors duration-200 hover:cursor-pointer"
                    key={app.id}
                    onClick={() => {
                      window.open(mainUrl(app, network), "_blank");
                    }}
                  >
                    <td className="pl-4 text-left text-label font-bold sticky left-0 z-10">
                      <NoisyContainer className="bg-dapps-icon-gradient rounded-xl overflow-hidden size-12 shrink-0">
                        <Image
                          src={app.imageUrl || "/apps/app-icon-placeholder.png"}
                          alt={"dapps icon"}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </NoisyContainer>
                    </td>
                    <td
                      className="text-left [mask:linear-gradient(to_right,_var(--tw-gradient-stops))] from-0% via-0% from-transparent via-white to-white px-2"
                      style={
                        {
                          "--tw-gradient-from-position": `${maskViaPercent}px`,
                          "--tw-gradient-via-position": `${maskViaPercent}px`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="flex flex-col justify-center gap-1 max-w-lg min-w-48 px-2 left-0">
                        <div className="text-lg font-medium">{app.name}</div>
                        <div className="text-body-3 opacity-50">
                          {app.description}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-end items-center gap-1 flex-wrap max-w-[200px]">
                        {app.tags.map((tag) => (
                          <TableRowPill key={tag}>{tag}</TableRowPill>
                        ))}
                      </div>
                    </td>
                    <td className="text-right pl-2 pr-4">
                      <div className="flex gap-2 justify-end">
                        <AppLinks links={app.links} network={network} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollWithGradient>
        </div>
      )}
    </div>
  );
};

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
    onPercent((scrollPosition / totalOverflow) * 100, scrollPosition);
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

const ScrollWithGradient: React.FC<
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
        "overflow-x-scroll [mask:linear-gradient(to_right,_var(--tw-gradient-stops))] from-80% from-white to-transparent",
        className
      )}
      ref={scrollRef}
    >
      {children}
    </div>
  );
};
