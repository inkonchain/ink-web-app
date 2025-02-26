import React from "react";
import { Metadata, Viewport } from "next";

import "@/app/tailwind.css";

export const metadata: Metadata = {
  verification: {
    // TODO: Put the valid verification ID here.
    google: "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
