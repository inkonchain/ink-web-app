"use client";

import React, { useEffect, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { useTheme } from "next-themes";

import { MoonIcon } from "@/components/icons/Moon";
import { SunIcon } from "@/components/icons/Sun";
import { pushToDataLayer } from "@/util/dataLayer";

import { RoundedIconButton } from "./Button/RoundedIconButton";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const onToggleTheme = () => {
    const newTheme = resolvedTheme == "dark" ? "light" : "dark";
    setTheme(newTheme);
    sendGTMEvent({ event: "theme_change", theme: newTheme });
  };

  /**
   * This is not ideal, but it's best solution we have to avoid rendering the button
   * with the wrong color/icon
   */
  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  useEffect(() => {
    if (resolvedTheme) {
      pushToDataLayer({ theme: resolvedTheme });
    }
  }, [resolvedTheme]);

  if (!isMounted) {
    return null;
  }

  return (
    <RoundedIconButton
      type="button"
      onClick={onToggleTheme}
      aria-label={`Switch to ${resolvedTheme === "light" ? "Dark" : "Light"} Theme`}
    >
      {resolvedTheme === "light" ? (
        <SunIcon size="icon-xl" />
      ) : (
        <MoonIcon size="icon-xl" />
      )}
    </RoundedIconButton>
  );
};
