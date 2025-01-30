import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@inkonchain/ink-kit";

import { appCategories } from "./categories";

interface AppsCategoryFilterProps {
  selected: string | undefined;
  setSelected: (value: string | undefined) => void;
}

export const AppsCategoryFilter = ({
  selected,
  setSelected,
}: AppsCategoryFilterProps) => {
  const selectedItem =
    appCategories.find((item) => item.value === selected) || appCategories[0];
  return (
    <Listbox
      value={selectedItem}
      onChange={(option) => setSelected(option.value ?? undefined)}
    >
      <ListboxButton
        className="whitespace-nowrap flex items-center gap-4 ink:text-body-3-bold"
        iconLeft={selectedItem.icon}
        variant="muted"
      >
        {selectedItem.label}
      </ListboxButton>
      <ListboxOptions>
        {appCategories.map((item) => (
          <ListboxOption key={item.value} value={item} iconLeft={item.icon}>
            {item.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
