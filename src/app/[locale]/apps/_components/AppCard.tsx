import { useState } from "react";
import Image from "next/image";

import { ParallaxedHoverImage } from "@/components/ParallaxedHoverImage";
import featuredApps from "@/generated/featured-apps.json";
import { classNames } from "@/util/classes";

import { AppLinks } from "./AppLinks";
import { FeaturedAppPill } from "./FeaturedAppPill";
import { InkApp, InkAppNetwork, mainUrl } from "./InkApp";

function matchAppImageFileName(name: string): string {
  // No whitespace, colons seems to be replaced with underscores.
  // Check the exported Figma file and adjust to match them if necessary.
  return name.replaceAll(/:/g, "_").replaceAll(/ /g, "");
}

export function AppCard({
  app,
  network,
}: {
  app: InkApp;
  network: InkAppNetwork;
}) {
  const [originalClick, setOriginalClick] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const featuredAppSpecificImage = featuredApps.find(
    (f) => f.name === app.name || f.name === matchAppImageFileName(app.name)
  );
  return (
    <div
      className={classNames(
        "flex flex-col backdrop-blur-sm overflow-hidden dark:text-whiteMagic h-full bg-featuredCardPurple rounded-app-card"
      )}
    >
      <div className="flex flex-col relative w-full">
        <button
          className="w-full aspect-[2/1] min-h-44 rounded-app-card overflow-hidden relative"
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              setOriginalClick({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
              });
            }
          }}
          onTouchEnd={(e) => {
            if (originalClick && e.touches.length > 0) {
              const deltaX = e.touches[0].clientX - originalClick.x;
              const deltaY = e.touches[0].clientY - originalClick.y;
              if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                window.open(mainUrl(app, network), "_blank");
              }
            }
          }}
          onMouseDown={(e) => {
            setOriginalClick({ x: e.clientX, y: e.clientY });
          }}
          onMouseUp={(e) => {
            if (originalClick) {
              const deltaX = e.clientX - originalClick.x;
              const deltaY = e.clientY - originalClick.y;
              if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                window.open(mainUrl(app, network), "_blank");
              }
            }
          }}
        >
          <ParallaxedHoverImage
            src={
              featuredAppSpecificImage
                ? featuredAppSpecificImage.url
                : app.imageUrl
            }
            width={320}
            height={160}
            alt={app.name}
          />
          {app.tags.length > 0 && (
            <div className="absolute top-6 right-6 pointer-events-none flex gap-2">
              {app.tags.map((tag) => (
                <FeaturedAppPill key={tag}>{tag}</FeaturedAppPill>
              ))}
            </div>
          )}
          {featuredAppSpecificImage && (
            <div className="absolute bottom-6 left-6 pointer-events-none">
              <Image
                className="size-20 rounded-3xl shadow-md"
                src={app.imageUrl || "/apps/app-icon-placeholder.png"}
                alt={app.name}
                width={80}
                height={80}
              />
            </div>
          )}
        </button>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4 w-full h-full">
        <div className="tracking-tighter ink:text-h5 h-[15px]">{app.name}</div>
        <div className="flex-1 text-body-3 opacity-80 dark:opacity-50">
          {app.description}
        </div>
        <AppLinks links={app.links} network={network} />
      </div>
    </div>
  );
}
