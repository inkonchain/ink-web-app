import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { NoisyContainer } from "@/components/Noisy";

import { AppLinks } from "./AppLinks";
import { InkApp, InkAppNetwork } from "./InkApp";
import { TableRowPill } from "./TableRowPill";

export const AppsGrid: React.FC<{
  apps: InkApp[];
  featuredApps: InkApp[];
  noAppsFound: React.ReactNode;
  network: InkAppNetwork;
}> = ({ apps, featuredApps, noAppsFound, network }) => {
  return (
    <div>
      {apps.length === 0 ? (
        <div className="min-h-[300px] flex flex-col gap-4 justify-center items-center">
          {noAppsFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 hd:grid-cols-4 gap-4 w-full">
          {featuredApps.map((app) => (
            <AppCard key={app.id} app={app} network={network} featured />
          ))}
          {apps.map((app) => (
            <AppCard key={app.id} app={app} network={network} />
          ))}
        </div>
      )}
    </div>
  );
};

function AppCard({
  app,
  network,
  featured,
}: {
  app: InkApp;
  network: InkAppNetwork;
  featured?: boolean;
}) {
  const t = useTranslations("dashboard");
  return (
    <div className="flex flex-col gap-6 backdrop-blur-sm ink:bg-background-container rounded-2xl p-4 group">
      <div className="flex w-full justify-between">
        <NoisyContainer className="bg-dapps-icon-gradient rounded-xl overflow-hidden size-16 shrink-0">
          <Image
            src={app.imageUrl || "/apps/app-icon-placeholder.png"}
            alt={"dapps icon"}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </NoisyContainer>
        {featured && (
          <div>
            <div className="ink:text-caption-2-bold p-2 dark:bg-featured-card-gradient-dark bg-featured-card-gradient text-whiteMagic dark:text-blackMagic rounded-xl">
              {t("featured")}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="ink:text-h5">{app.name}</div>
        <div className="flex-1 ink:text-body-3-regular">{app.description}</div>
        <div className="relative">
          <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity">
            <AppLinks links={app.links} network={network} />
          </div>

          <div className="flex justify-end items-center gap-1 flex-wrap max-w-[200px] group-hover:opacity-0 group-hover:pointer-events-none transition-opacity absolute right-0 bottom-0">
            {app.tags.map((tag) => (
              <TableRowPill key={tag}>{tag}</TableRowPill>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
