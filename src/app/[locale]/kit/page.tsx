"use client";
import {
  Button,
  ConnectWallet,
  InkIcon,
  SegmentedControl,
} from "@inkonchain/ink-kit";

export default function InkKit() {
  return (
    <>
      <div className="w-full p-4 flex flex-col items-center gap-4 ink:bg-background-light rounded-4xl">
        <h1 className="text-h1 p-4 ink:text-text-default">
          Testing InkKit components
        </h1>
        <Button
          className="flex items-center gap-2 w-fit"
          variant="primary"
          size="md"
          iconLeft={<InkIcon.Deposit />}
        >
          Primary
        </Button>
        <Button
          className="flex items-center gap-2 w-fit"
          variant="secondary"
          size="md"
          iconRight={<InkIcon.Chevron />}
        >
          Secondary
        </Button>
        <SegmentedControl
          options={[
            {
              children: "Option 1",
              value: "option-1",
              selectedByDefault: true,
            },
            { children: "Option 2", value: "option-2" },
            { children: "Option 3", value: "option-3" },
          ]}
          onOptionChange={(option) => console.debug("option change: ", option)}
        />
        <ConnectWallet />
      </div>
    </>
  );
}
