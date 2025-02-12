"use client";
import { Button, Card, CardContent, InkIcon } from "@inkonchain/ink-kit";

import { ColoredText } from "@/components/ColoredText";
import { Link } from "@/routing";

export const HomeTagLine = () => {
  return (
    <Card>
      <CardContent.Tagline
        title={
          <ColoredText variant="purple">
            The future isn&apos;t written,
            <br />
            it&apos;s waiting to be inked.
          </ColoredText>
        }
        buttons={
          <>
            <Button asChild size="lg" iconLeft={<InkIcon.Bridge />}>
              <Link href="/new/bridge">Bridge now</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              iconLeft={<InkIcon.Social.X />}
            >
              <Link href="https://x.com/inkonchain">Follow us</Link>
            </Button>
          </>
        }
      ></CardContent.Tagline>
    </Card>
  );
};
