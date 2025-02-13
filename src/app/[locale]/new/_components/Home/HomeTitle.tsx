"use client";
import { Button } from "@inkonchain/ink-kit";

import { ColoredText } from "@/components/ColoredText";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { PageHeader } from "../PageHeader";

export const HomeTitle = () => {
  const query = useRouterQuery();
  return (
    <PageHeader
      title="Ink the future"
      description={
        <ColoredText variant="purple">Simplified DeFi for builders</ColoredText>
      }
      cta={
        <Button variant="primary" size="lg">
          <Link href={{ pathname: "/new/apps", query }}>Explore Apps</Link>
        </Button>
      }
      size="home"
    />
  );
};
