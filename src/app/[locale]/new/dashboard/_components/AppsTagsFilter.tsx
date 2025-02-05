import React, { useMemo } from "react";
import {
  Checkbox,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@inkonchain/ink-kit";

import { inkTags } from "./InkApp";

interface AppsTagsFilterProps {
  selected: string[] | undefined;
  setSelected: (value: string[] | undefined) => void;
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const tags = inkTags
  .map((tag) => ({
    value: tag,
    label: capitalizeFirstLetter(tag),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const AppsTagsFilter: React.FC<AppsTagsFilterProps> = ({
  selected,
  setSelected,
}) => {
  const selectedTags = useMemo(
    () => tags.filter((tag) => selected?.includes(tag.value)),
    [selected]
  );

  const toggleAll = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (selectedTags.length > 0) {
        setSelected([]);
      } else {
        setSelected(tags.map((t) => t.value));
      }
    },
    [selectedTags, setSelected]
  );

  return (
    <Listbox value={selected || []} onChange={setSelected} multiple>
      <ListboxButton
        className="whitespace-nowrap backdrop-blur-xl ink:text-body-3-bold w-[120px] h-10"
        variant="muted"
      >
        <div className="flex items-center gap-2">
          <div>
            {selectedTags.length === 0 ? (
              <span>All Tags</span>
            ) : (
              <span className="text-[var(--ink-text-default)]">Tags</span>
            )}
          </div>
          {selectedTags.length > 0 && (
            <div className="text-xs bg-[var(--ink-text-default)] text-[var(--ink-background-light)] size-5 rounded-full flex items-center justify-center ink:text-caption-1-bold">
              {selectedTags.length}
            </div>
          )}
        </div>
      </ListboxButton>
      <ListboxOptions>
        <ListboxOption
          className="mb-1"
          key="all"
          value={null}
          onClick={toggleAll}
          iconLeft={
            <Checkbox
              checked={selectedTags.length === tags.length}
              indeterminate={
                selectedTags.length > 0 && selectedTags.length < tags.length
                  ? true
                  : undefined
              }
            />
          }
          iconRight={<></>}
        >
          Select all
        </ListboxOption>
        {tags.map((tag) => (
          <ListboxOption key={tag.value} value={tag.value} iconRight={<></>}>
            <div className="flex items-center gap-2">
              <span>{tag.label}</span>
            </div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
