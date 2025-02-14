"use client";
import { Button } from "@inkonchain/ink-kit";

import { ColoredText } from "@/components/ColoredText";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { PageHeader } from "../PageHeader";

export const HomeTitle = () => {
  const query = useRouterQuery();
  return (
    <>
      <PageHeader
        pre={
          <div className="flex items-center justify-center ink:gap-1">
            <img src="/icons/1s-block-times.svg" width={20} height={20} />
            <div>Kraken&apos;s L2 now live on Superchain!</div>
          </div>
        }
        title="Ink the future"
        description={
          <ColoredText variant="purple">
            Simplified DeFi for builders
          </ColoredText>
        }
        cta={
          <Button variant="primary" size="lg">
            <Link href={{ pathname: "/new/apps", query }}>Explore Apps</Link>
          </Button>
        }
        size="home"
      />
    </>
  );
};
