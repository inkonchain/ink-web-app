import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@inkonchain/ink-kit";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { appCategories } from "./categories";

interface AppsCategoryFilterProps {
  selected: string | undefined;
  setSelected: (value: string | undefined) => void;
  newLayout?: boolean;
}

export const AppsCategoryFilter = ({
  selected,
  setSelected,
  newLayout,
}: AppsCategoryFilterProps) => {
  const query = useRouterQuery();
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
          <ListboxOption
            key={item.value}
            value={item}
            iconLeft={item.icon}
            asChild={newLayout}
          >
            {newLayout ? (
              <Link
                href={{
                  pathname: `/new/dashboard/[category]`,
                  params: { category: item.value || "" },
                  query,
                }}
              >
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
