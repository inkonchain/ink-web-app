"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import dynamic from "next/dynamic";

// Disable SSR for this component
const FPSLimiter = dynamic(
  () =>
    Promise.resolve(({ fps }: { fps: number }) => {
      const { advance, set, frameloop: initFrameloop } = useThree();

      useLayoutEffect(() => {
        let elapsed = 0;
        let then = 0;
        let raf: number = -1;
        const interval = 1000 / fps;

        function tick(timeStamp: DOMHighResTimeStamp) {
          raf = requestAnimationFrame(tick);
          elapsed = timeStamp - then;
          if (elapsed > interval) {
            advance(timeStamp / 1000, true);
            then = timeStamp - (elapsed % interval);
          }
        }

        raf = requestAnimationFrame(tick);

        return () => {
          cancelAnimationFrame(raf);
          set({ frameloop: initFrameloop });
        };
      }, [advance, fps, initFrameloop, set]);

      return null;
    }),
  { ssr: false }
);

export { FPSLimiter };
