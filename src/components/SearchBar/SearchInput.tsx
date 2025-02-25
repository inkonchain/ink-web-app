import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { InkIcon, Input } from "@inkonchain/ink-kit";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { classNames } from "@/util/classes";

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
      iconLeft={<InkIcon.Search />}
      iconRight={
        <div className="px-2 py-1 rounded-lg ink:bg-background-container font-bold ink:text-text-default">
          {"/"}
        </div>
      }
      {...inputProps}
    />
  );
});

SearchInput.displayName = "SearchInput";
