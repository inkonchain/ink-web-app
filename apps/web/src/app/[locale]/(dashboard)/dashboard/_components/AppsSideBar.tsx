import { ListItem } from "@inkonchain/ink-kit";

import { classNames } from "@/util/classes";

import { appCategories } from "./categories";

interface AppsSideBarProps {
  selected: string | null;
  setSelected: (value: string | null) => void;
}

export const AppsSideBar = ({ selected, setSelected }: AppsSideBarProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {appCategories.map((filter, index) => (
        <ListItem
          key={filter.value || index}
          className={classNames(
            selected === filter.value && "ink:bg-background-container"
          )}
          iconLeft={filter.icon}
          onClick={() => setSelected(filter.value)}
        >
          {filter.label}
        </ListItem>
      ))}
    </div>
  );
};
