"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

import { ColoredText } from "@/components/ColoredText";
import { SquareDividerIcon } from "@/components/icons/SquareDivider";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { PillContainer } from "@/components/PillContainer";
import { ResponsiveText } from "@/components/ResponsiveText";
import { useOnInterval } from "@/hooks/useOnInterval";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { EXTERNAL_LINKS, Link } from "@/routing";
import { largeMovementTransition } from "@/util/transitions";

type TimeChunks = [number, number, number, number];

const RELEASE_DATE = new Date("2024-11-11T04:20:00Z").getTime();
function getRemainingTime(): TimeChunks {
  const now = Date.now();
  const seconds = Math.floor(RELEASE_DATE - now) / 1000;

  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secondsRemaining = Math.floor(seconds % 60);

  return [days, hours, minutes, secondsRemaining];
}

export interface CountdownProps {}

export const Countdown: React.FC<CountdownProps> = ({}) => {
  const { resolvedTheme } = useTheme();
  const query = useRouterQuery();
  const queryWithCategory = query
    ? `${query}&category=bridge`
    : "category=bridge";

  let [currentTime, setCurrentTime] =
    useState<[number, number, number, number]>();
  useOnInterval(() => setCurrentTime(getRemainingTime()), 350);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {currentTime ? (
        <motion.div
          className="w-fit flex flex-col gap-1"
          key="countdown"
          transition={largeMovementTransition}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <PillContainer className="flex gap-3 sm:gap-3 items-center justify-center px-2 pr-4 z-20">
            {resolvedTheme === "light" ? (
              <Image
                src="/testnet-dark.png"
                width={24}
                height={24}
                alt="testnet-dark"
              />
            ) : (
              <Image src="/testnet.png" width={24} height={24} alt="testnet" />
            )}
            <OnlyWithFeatureFlag
              flag="mainnet"
              otherwise={
                <>
                  <ColoredText variant="reverse-purple">
                    <div className="text-sm text-center font-bold hover:text-krakenPurple">
                      <Link
                        href={EXTERNAL_LINKS.documentation}
                        target="_blank"
                        className="border-b border-krakenPurple"
                      >
                        Testnet live early!
                      </Link>
                    </div>
                  </ColoredText>
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <TimeChunk value={0} label="day" />
                    <SquareDividerIcon />
                    <TimeChunk value={0} label="hour" />
                    <SquareDividerIcon />
                    <TimeChunk value={0} label="minute" />
                    <SquareDividerIcon />
                    <TimeChunk value={0} label="second" />
                  </div>
                </>
              }
            >
              <span className="font-semibold flex gap-3 text-sm">
                <span>Mainnet is live!</span>
                <Link
                  href={{
                    pathname: "/dashboard",
                    query: queryWithCategory,
                  }}
                  className="text-purpleMagic hover:opacity-85"
                >
                  Bridge to Ink
                </Link>
              </span>
            </OnlyWithFeatureFlag>
          </PillContainer>
        </motion.div>
      ) : (
        <div className="py-1">
          {/** Prevents the pill appearance from moving the layout */}
          &nbsp;
        </div>
      )}
    </AnimatePresence>
  );
};

export interface TimeChunkProps {
  value: number;
  label: string;
}

export const TimeChunk: React.FC<TimeChunkProps> = ({ value, label }) => {
  return (
    <div className="inline-flex text-sm font-bold">
      <span className="relative w-5 sm:w-6">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            className="absolute inset-0 flex justify-center"
            key={`countdown-time-${label}-${value}`}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            exit={{ rotateX: -90, transformOrigin: "bottom" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              transformOrigin: "top",
            }}
          >
            {value < 10 ? "0" : ""}
            {value}
          </motion.div>
        </AnimatePresence>
      </span>
      <span className="opacity-50">
        <ResponsiveText mobile={label.substring(0, 1)} desktop={`${label}s`} />
      </span>
    </div>
  );
};
