"use client";
import { Button } from "@inkonchain/ink-kit";

import { ColoredText } from "@/components/ColoredText";
import { newLayoutSectionClasses } from "@/components/styles/container";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { AppsGrid } from "../../apps/_components/AppsGrid";
import { inkApps } from "../../apps/_components/InkApp";

export const HomeApps = () => {
  const query = useRouterQuery();
  const apps = inkApps.slice(0, 8);
  return (
    <div className={newLayoutSectionClasses()}>
      <div className="flex justify-between">
        <ColoredText className="ink:text-h4" variant="purple">
          Discover apps on Ink
        </ColoredText>
        <Button asChild variant="secondary">
          <Link href={{ pathname: "/apps", query }}>View all apps</Link>
        </Button>
      </div>
      <AppsGrid
        apps={apps}
        featuredApps={[]}
        noAppsFound={null}
        network="Mainnet"
      />
    </div>
  );
};
