"use client";

import { Button, InkIcon } from "@inkonchain/ink-kit";
import { useTheme } from "next-themes";

import { classNames } from "@/util/classes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      rounded="full"
      className="ink:text-text-muted duration-0 bg-transparent"
      iconLeft={
        <div className="relative">
          <InkIcon.Sun
            className={classNames(
              "absolute inset-0 opacity-0",
              theme === "dark" && "opacity-100"
            )}
            size="icon-lg"
            enforce="inherit"
          />
          <InkIcon.Moon
            className={classNames(
              "absolute inset-0 opacity-100",
              theme === "dark" && "opacity-0"
            )}
            size="icon-lg"
            enforce="inherit"
          />
        </div>
      }
    />
  );
};
