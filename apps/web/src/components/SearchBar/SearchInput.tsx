import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Input } from "@inkonchain/ink-kit";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { classNames } from "@/util/classes";

import { SearchIcon } from "../icons/Search";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  onValueChange: (value: string) => void;
}

export const SearchInput = forwardRef<
  HTMLInputElement | null,
  SearchInputProps
>(({ className, disabled, onValueChange, value, ...inputProps }, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => inputRef.current!, []);

  useCallbackOnKey({
    key: "/",
    isDisabled: disabled,
    handler: () => {
      if (inputRef.current) {
        inputRef.current.focus();
        const position = inputRef.current.getBoundingClientRect();
        window.scrollTo({
          top: position.top + window.scrollY - 120,
          behavior: "smooth",
        });
        return true;
      }
      return false;
    },
  });

  return (
    <Input
      type="search"
      required
      ref={inputRef}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      disabled={disabled}
      className={classNames(
        "ink:rounded-md duration-0 backdrop-blur-xl ink:text-body-3-bold placeholder:text-body-3-bold",
        className
      )}
      iconLeft={
        <SearchIcon className="duration-0" enforce="inherit" size="icon-lg" />
      }
      iconRight={
        <div className="px-2 py-1 rounded-lg bg-krakenPurple/10 font-bold text-blackMagic/20 dark:text-whiteMagic/50">
          {"/"}
        </div>
      }
      {...inputProps}
    />
  );
});

SearchInput.displayName = "SearchInput";
