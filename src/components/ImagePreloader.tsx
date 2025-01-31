"use client";

import { useEffect } from "react";

export const ImagePreloader = () => {
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Preload all required images
    preloadImage("/icons/nav-bullet.svg");
    preloadImage("/nav-chad.png");
  }, []);

  return null;
};
