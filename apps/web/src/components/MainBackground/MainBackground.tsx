"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leva } from "leva";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import { useOnWindowSize } from "@/hooks/useOnWindowSize";

import { BackgroundScene } from "./BackgroundScene";

type MorpheusType = "video" | "3d" | "static" | "full";

interface MainBackgroundProps {
  type: MorpheusType;
}

export const MainBackground: React.FC<MainBackgroundProps> = ({ type }) => {
  const searchParams = useSearchParams();
  const showDebugTools = searchParams.has("debug");
  const limitFPS = searchParams.has("limitFPS");
  const searchParamsMorpheus = searchParams.get(
    "morpheus"
  ) as MorpheusType | null;
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    const ua = window?.navigator.userAgent;
    if (ua) {
      setIsSafari(ua.includes("Safari") && !ua.includes("Chrome"));
    }
  }, []);
  const searchParamsTopMorpheus = searchParams.get("topMorpheus") === "true";

  const typeToUse = searchParamsMorpheus || "full";

  return (
    <>
      {typeToUse === "full" ? (
        <FullMorpheus />
      ) : (
        <>
          {searchParamsTopMorpheus ? (
            <TopMorpheus
              type={typeToUse}
              showDebugTools={showDebugTools}
              limitFPS={limitFPS}
            />
          ) : (
            <CornerMorpheus
              type={typeToUse}
              showDebugTools={showDebugTools}
              limitFPS={limitFPS}
            />
          )}
        </>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-[350px] overflow-hidden z-[-1]">
        <div className="absolute bottom-0 w-screen flex justify-center">
          <Image
            className="object-contain dark:hidden min-w-[600px] w-full max-w-5xl"
            src="/footer.webp"
            width={1024}
            height={249}
            alt="ink footer"
          />
          <Image
            className="object-contain hidden dark:block min-w-[600px] w-full max-w-5xl"
            src="/footer-dark.png"
            width={1024}
            height={249}
            alt="ink footer"
          />
        </div>
      </div>
      <Leva hidden={!showDebugTools} />
    </>
  );
};
const FullMorpheus: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAttemptedPlay, setHasAttemptedPlay] = useState(false);
  const pathname = usePathname();
  const isMobile = useOnWindowSize({ size: "sm" });

  const { resolvedTheme } = useTheme();
  const [isFirstLoadDone, setIsFirstLoadDone] = useState<boolean>(false);

  useEffect(() => {
    setIsFirstLoadDone(true);
  }, []);

  const videoSource = useMemo(() => {
    const isBridgePage = pathname?.includes("/testnet-bridge");
    const isFaucetPage = pathname?.includes("/faucet");

    if (isFaucetPage) {
      return `/hero/desktop-top-down-${resolvedTheme === "dark" ? "dark" : "light"}.mp4`;
    }
    if (isBridgePage) {
      return `/hero/desktop-sides-${resolvedTheme === "dark" ? "dark" : "light"}.mp4`;
    }
    return `/hero/${isMobile ? "mobile" : "desktop"}-${resolvedTheme === "dark" ? "dark" : "light"}.mp4`;
  }, [isMobile, resolvedTheme, pathname]);

  // Add effect to track isPlaying changes
  useEffect(() => {}, [isPlaying]);

  useEffect(() => {
    if (!videoRef.current || hasAttemptedPlay || !isMobile) return;

    const video = videoRef.current;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
      }
      setHasAttemptedPlay(true);
    };

    const handleCanPlay = () => {
      if (!hasAttemptedPlay) {
        playVideo();
      }
    };

    // Only try to play when the video is ready
    video.addEventListener("canplay", handleCanPlay);

    // Handle user interaction
    const handleInteraction = () => {
      if (!isPlaying) {
        playVideo();
      }
    };

    const events = ["touchstart", "click"];
    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [videoSource, hasAttemptedPlay, isPlaying, isMobile]);

  return (
    <div className="overflow-hidden absolute top-0 left-0 right-0 flex items-center justify-center z-[-1]">
      {isFirstLoadDone &&
        (isMobile ? (
          // Mobile version without AnimatePresence
          <motion.video
            ref={videoRef}
            key={videoSource}
            poster={videoSource}
            width={3840}
            height={2160}
            className={`h-[780px] sm:min-h-[85vh] object-cover rounded-b-3xl sm:rounded-b-spotlight cursor-pointer [&::-webkit-media-controls-panel]:hidden [&::-webkit-media-controls-play-button]:hidden [&::-webkit-media-controls-start-playback-button]:hidden ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => videoRef.current?.play()}
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            autoPlay
            loop
            muted
            src={videoSource}
          />
        ) : (
          // Desktop version with AnimatePresence
          <AnimatePresence mode="popLayout">
            <motion.video
              ref={videoRef}
              key={videoSource}
              width={3840}
              height={2160}
              className="h-[780px] sm:min-h-[85vh] object-cover sm:rounded-b-spotlight"
              playsInline
              controls={false}
              disablePictureInPicture
              autoPlay
              loop
              muted
              src={videoSource}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </AnimatePresence>
        ))}
    </div>
  );
};
interface MorpheusProps {
  showDebugTools: boolean;
  limitFPS: boolean;
  type: MorpheusType;
}

const CornerMorpheus: React.FC<MorpheusProps> = ({
  type,
  showDebugTools,
  limitFPS,
}) => {
  return (
    <div className="overflow-hidden absolute right-0 top-0 w-[1000px] h-[1000px] -z-10">
      {type === "3d" ? (
        <div className="absolute -top-[450px] -right-[450px] left-1/2 w-[800px] h-[800px]">
          <BackgroundScene
            showDebugTools={showDebugTools}
            limitFPS={limitFPS}
          />
        </div>
      ) : type === "video" ? (
        <div className="absolute -top-[550px] -right-[500px] left-1/2">
          <video
            width={1080}
            height={1080}
            className="object-cover w-full h-full"
            playsInline
            controls={false}
            disablePictureInPicture
            autoPlay
            loop
            muted
          >
            <source
              src="/morpheus-mobile.webm"
              type="video/webm"
              media="(max-width: 640px)"
            />
            <source src="/morpheus.webm" type="video/webm" />
          </video>
        </div>
      ) : (
        <div className="overflow-hidden absolute -right-[450px] -top-[250px] h-[800px] w-[800px] -z-10">
          <Image
            className="object-contain -rotate-45"
            src="/ink-splash.png"
            width={1498}
            height={1349}
            alt="ink splash"
          />
        </div>
      )}
    </div>
  );
};

const TopMorpheus: React.FC<MorpheusProps> = ({
  type,
  showDebugTools,
  limitFPS,
}) => {
  return (
    <>
      {type === "3d" ? (
        <div className="overflow-hidden absolute left-0 -right-0 bottom-0 sm:bottom-auto sm:top-0 h-[35vw]">
          <div className="absolute -z-10 -left-[10vw] -right-1/4 -top-[5vw] sm:bottom-0 sm:top-auto w-[120vw] h-[150vw]">
            <BackgroundScene
              showDebugTools={showDebugTools}
              limitFPS={limitFPS}
            />
          </div>
        </div>
      ) : type === "video" ? (
        <div className="overflow-hidden absolute left-0 right-0 bottom-0 sm:bottom-auto sm:top-0 h-[35vw]">
          <div className="absolute -z-10 -left-1/4 -right-1/4 -top-[20vw] sm:-bottom-[5vw] sm:top-auto w-[150vw] h-[150vw]">
            <video
              width={1080}
              height={1080}
              className="object-cover w-full h-full"
              playsInline
              controls={false}
              disablePictureInPicture
              autoPlay
              loop
              muted
            >
              <source
                src="/morpheus-mobile.webm"
                type="video/webm"
                media="(max-width: 640px)"
              />
              <source src="/morpheus.webm" type="video/webm" />
            </video>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden absolute left-0 right-0 bottom-0 sm:bottom-auto sm:top-0 h-48 sm:h-64">
          <div className="absolute -z-10 sm:bottom-0 mx-auto w-full flex justify-center">
            <Image
              className="object-contain rotate-180"
              src="/ink-splash.png"
              width={1498}
              height={1349}
              alt="ink splash"
            />
          </div>
        </div>
      )}
    </>
  );
};
