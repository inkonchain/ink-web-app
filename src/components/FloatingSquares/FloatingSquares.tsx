"use client";

import { CSSProperties, useEffect, useState } from "react";

import { classNames } from "@/util/classes";

import "./FloatingSquares.scss";

interface PropsWithClass {
  className?: string;
}

interface AnimationProps {
  delayMs: number;
  durationMs: number;
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const FloatingSquares: React.FC<PropsWithClass> = ({ className }) => {
  const [random, setRandom] = useState<number>();

  useEffect(() => {
    setRandom(randomInteger(1000, 4000));
  }, [setRandom]);

  if (!random) {
    return null;
  }

  return (
    <div className={classNames("absolute bottom-0 top-0", className)}>
      <div className="relative h-full">
        <GroupOfSquares delayMs={200 + random} durationMs={5000} />
        <GroupOfSquares delayMs={1000 + random} durationMs={4000} />
        <GroupOfSquares delayMs={500 + random} durationMs={4500} />
      </div>
    </div>
  );
};

const randomNumberToRender = () => Array.from(new Array(randomInteger(1, 3)));
const randomPosition = () => randomInteger(50, 500);

const GroupOfSquares: React.FC<AnimationProps> = ({ delayMs, durationMs }) => {
  const [numberToRender, setNumberToRender] = useState(randomNumberToRender());
  const [positionY, setPositionY] = useState(randomPosition());

  useEffect(() => {
    const interval = setTimeout(() => {
      setNumberToRender(randomNumberToRender());
      setPositionY(randomPosition());
    }, delayMs + durationMs);

    return () => clearInterval(interval);
  }, [delayMs, durationMs]);

  return (
    <div
      className={classNames("flex flex-col gap-1 absolute left-1")}
      style={
        {
          top: `${positionY}px`,
          "--animation-delay": `${delayMs}ms`,
          "--animation-duration": `${durationMs}ms`,
        } as CSSProperties
      }
    >
      {numberToRender.map((_, i) => (
        <div key={i} className="animated-square size-2 bg-gray-300" />
      ))}
    </div>
  );
};
