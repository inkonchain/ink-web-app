"use client";

import React from "react";
import { useTheme } from "next-themes";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";

export const ToggleThemeShortcut: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  useCallbackOnKey({
    key: "f",
    handler: () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      return true;
    },
  });
  return null;
};
