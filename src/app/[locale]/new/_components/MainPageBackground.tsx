"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { MainBackground } from "@/components/MainBackground/MainBackground";

export const MainPageBackground: React.FC = () => {
  const path = usePathname();

  return null;

  if (path === "/new") {
    return <MainBackground type="static" />;
  }

  return null;
};
