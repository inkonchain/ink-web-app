import React from "react";
import { Tag } from "@inkonchain/ink-kit";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { NoisyContainer } from "@/components/Noisy";

import { AppLinks } from "./AppLinks";
import { InkApp, InkAppNetwork, mainUrl } from "./InkApp";

export const AppsGrid: React.FC<{
  apps: InkApp[];
  featuredApps: InkApp[];
  noAppsFound: React.ReactNode;
  network: InkAppNetwork;
}> = ({ apps, featuredApps, noAppsFound, network }) => {
  return (
    <div className="w-full">
      {apps.length === 0 ? (
        <div className="min-h-[300px] flex flex-col gap-4 justify-center items-center">
          {noAppsFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 hd:grid-cols-4 gap-2 w-full">
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
    <button
      className="flex flex-col gap-6 backdrop-blur-sm ink:bg-background-container ink:rounded-lg p-4 text-left group"
      onClick={() => {
        window.open(mainUrl(app, network), "_blank");
      }}
    >
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
            <div className="ink:text-caption-2-bold px-2 py-1 ink:bg-background-container ink:text-text-on-secondary rounded-xl">
              {t("featured")}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 flex-1 w-full">
        <div className="ink:text-h5">{app.name}</div>
        <div className="flex-1 ink:text-body-3-regular ink:text-text-muted">
          {app.description}
        </div>
        <div className="relative flex flex-col gap-2">
          <div className="flex lg:justify-end items-center gap-1 flex-wrap lg:group-hover:opacity-0 lg:group-hover:pointer-events-none transition-opacity w-full">
            {app.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="w-full lg:opacity-0 group-hover:opacity-100 transition-opacity lg:absolute lg:right-0 lg:bottom-0">
            <AppLinks
              className="justify-start lg:justify-end"
              links={app.links}
              network={network}
            />
          </div>
        </div>
      </div>
    </button>
  );
}
