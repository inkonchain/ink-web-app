import { useMemo, useRef, useState } from "react";
import Image from "next/image";

import { useOutsideClickListener } from "@/hooks/useOnOutsideClick";
import { classNames } from "@/util/classes";

import { ArrowOnHover } from "../ArrowOnHover";
import { PillContainer } from "../PillContainer";

import { SearchInput } from "./SearchInput";

export interface SearchBarItem {
  id: string;
  name: string;
  imageUrl: string;
  badges?: React.ReactNode[];
  href: string;
  searchTerms: string;
}

export interface SearchBarProps {
  className?: string;
  items: SearchBarItem[];
  placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  items,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const filteredItems = useMemo(
    () =>
      items
        .filter((item) =>
          item.searchTerms.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 5),
    [searchTerm, items]
  );

  function closeAll() {
    setIsInputFocused(false);
  }

  useOutsideClickListener({
    ref: popoverRef,
    handler: closeAll,
  });

  return (
    <div
      className={classNames("relative transition-all select-none", className)}
      ref={popoverRef}
    >
      <SearchInput
        ref={inputRef}
        onValueChange={setSearchTerm}
        onClick={() => setIsInputFocused(true)}
        onFocus={() => setIsInputFocused(true)}
        {...inputProps}
      />

      <div className="relative">
        {isInputFocused && (
          <div className="absolute top-px left-0 w-full z-50 bg-whiteMagic text-blackMagic dark:bg-blackMagic dark:text-whiteMagic flex flex-col rounded-3xl p-4 gap-4">
            {filteredItems.length === 0 && (
              <div className="text-center text-sm p-2">No results found</div>
            )}
            {filteredItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 flex items-center justify-between gap-4 hover:bg-purpleMagic/10 transition-colors duration-300 rounded-xl group"
              >
                <div className="flex items-center gap-4">
                  <Image
                    className="size-12 object-cover"
                    src={item.imageUrl}
                    width={48}
                    height={48}
                    alt={item.name}
                  />
                  <span className="text-label font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  {item.badges?.map((badge, index) => (
                    <PillContainer
                      variant="purple"
                      className="w-fit"
                      key={index}
                    >
                      <div className="text-xs font-bold">{badge}</div>
                    </PillContainer>
                  ))}
                  <ArrowOnHover size="icon-lg" external />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
