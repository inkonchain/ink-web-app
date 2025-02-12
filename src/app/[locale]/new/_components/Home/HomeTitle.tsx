import { Button } from "@inkonchain/ink-kit";

import { ColoredText } from "@/components/ColoredText";
import { Link } from "@/routing";

import { PageHeader } from "../PageHeader";

export const HomeTitle = () => {
  return (
    <PageHeader
      title="Ink the future"
      description={
        <ColoredText variant="purple">Simplified DeFi for builders</ColoredText>
      }
      cta={
        <Button variant="primary" size="lg">
          <Link href="/new/apps">Explore Ink</Link>
        </Button>
      }
      size="home"
    />
  );
};
