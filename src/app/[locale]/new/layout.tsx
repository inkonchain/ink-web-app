import React from "react";

import { Footer } from "@/components/Footer";
import { OnlyWithFeatureFlag } from "@/components/OnlyWithFeatureFlag";
import { routing } from "@/routing";

import { MainPageBackground } from "./_components/MainPageBackground";
import { RoutedLayout } from "./apps/_components/RoutedLayout";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnlyWithFeatureFlag flag="newNav">
      <RoutedLayout>
        <div className="relative pt-0 overflow-hidden flex flex-col gap-8 w-full items-center">
          <div className="flex flex-col w-full justify-center items-center">
            {children}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </RoutedLayout>
      <MainPageBackground />
    </OnlyWithFeatureFlag>
  );
}
