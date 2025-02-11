import { useMemo } from "react";
import { SegmentedControl } from "@inkonchain/ink-kit";

import { ScrollWithGradient } from "@/components/ScrollWithGradient";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";

import { appCategories } from "./categories";

interface AppsCategoryFilterProps {
  selected: string | undefined;
  setSelected: (value: string | undefined) => void;
}

const ALL_CATEGORY = "all";

export const AppsCategoryFilter = ({
  selected,
  setSelected,
}: AppsCategoryFilterProps) => {
  const query = useRouterQuery();
  const options = useMemo(
    () =>
      appCategories.map((item) => ({
        value: item.value || ALL_CATEGORY,
        selectedByDefault:
          selected === undefined
            ? item.value === null
            : selected === item.value,
        asChild: true,
        children: (
          <Link
            className="whitespace-nowrap"
            href={{
              pathname: `/new/apps/[category]`,
              params: { category: item.value || "" },
              query,
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {item.label}
          </Link>
        ),
      })),
    [selected, query]
  );
  return (
    <ScrollWithGradient className="flex overflow-x-scroll flex-1 w-full sm:w-auto no-scrollbar">
      <SegmentedControl
        variant="primary"
        variableTabWidth
        options={options}
        onOptionChange={(option) =>
          setSelected(option.value === ALL_CATEGORY ? "" : option.value)
        }
      />
    </ScrollWithGradient>
  );
};
