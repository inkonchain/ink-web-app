import { ListItem } from "@inkonchain/ink-kit";

import { useRouterQuery } from "@/hooks/useRouterQuery";
import { Link } from "@/routing";
import { classNames } from "@/util/classes";

import { appCategories } from "./categories";

interface AppsSideBarProps {
  selected: string | null;
  setSelected: (value: string | null) => void;
  newLayout?: boolean;
}

export const AppsSideBar = ({
  selected,
  setSelected,
  newLayout,
}: AppsSideBarProps) => {
  const query = useRouterQuery();
  return (
    <div className="flex flex-col gap-1 w-full">
      {appCategories.map((filter, index) => (
        <ListItem
          key={filter.value || index}
          className={classNames(
            selected === filter.value && "ink:bg-background-container"
          )}
          iconLeft={filter.icon}
          asChild={newLayout}
          onClick={() => setSelected(filter.value)}
        >
          {newLayout ? (
            <Link
              href={{
                pathname: `/new/apps/[category]`,
                params: { category: filter.value || "" },
                query,
              }}
            >
              {filter.label}
            </Link>
          ) : (
            filter.label
          )}
        </ListItem>
      ))}
    </div>
  );
};
