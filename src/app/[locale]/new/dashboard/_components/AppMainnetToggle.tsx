"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@inkonchain/ink-kit";

import { classNames } from "@/util/classes";

import { InkAppNetwork } from "./InkApp";

interface AppMainnetToggleProps {
  value: InkAppNetwork;
  onChange: (value: InkAppNetwork) => void;
}

const items = [
  { label: "All networks", value: "Both" },
  { label: "Mainnet", value: "Mainnet" },
  { label: "Testnet", value: "Testnet" },
] satisfies { label: string; value: InkAppNetwork }[];

export function AppMainnetToggle({ value, onChange }: AppMainnetToggleProps) {
  const selectedItem = items.find((item) => item.value === value) || items[0];

  return (
    <Listbox value={selectedItem} onChange={(option) => onChange(option.value)}>
      <ListboxButton
        variant="muted"
        className="backdrop-blur-xl ink:text-body-3-bold w-[160px] whitespace-nowrap h-10"
      >
        <span
          className={classNames(
            value !== "Mainnet" && "text-[var(--ink-text-default)]"
          )}
        >
          {selectedItem.label}
        </span>
      </ListboxButton>
      <ListboxOptions>
        {items.map((item) => (
          <ListboxOption key={item.value} value={item}>
            {item.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
