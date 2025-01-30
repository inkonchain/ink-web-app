import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

import { Loader } from "@/components/Loader";
import { usePrevious } from "@/hooks/usePrevious";
import { classNames } from "@/util/classes";
import { isValidEmail } from "@/util/validation";

import { ArrowRightIcon } from "../icons/ArrowRight";
import { CircleExclamationMarkIcon } from "../icons/CircleExclamationMark";

import {
  inputClassNames,
  inputContainerClassNames,
  inputIconClassNames,
  InputVariants,
} from "./styles";

export interface InputWithSubmitProps
  extends InputHTMLAttributes<HTMLInputElement> {
  variant: InputVariants;
  sizeVariant?: "default" | "large";
  inputClassName?: string;
  icon?: React.ReactNode;
  autoFocusOnEnable?: boolean;
  children?: React.ReactNode;
}

const transition = {
  duration: 0.6,
  stiffness: 50,
  type: "spring",
};

export const InputWithSubmit: React.FC<InputWithSubmitProps> = ({
  variant,
  sizeVariant,
  icon,
  children,
  className,
  inputClassName = "",
  disabled,
  autoFocusOnEnable,
  ...inputProps
}) => {
  const { pending } = useFormStatus();
  const [showValidationError, setShowValidationError] = useState(false);
  const displayError = showValidationError && !pending;

  const inputRef = useRef<HTMLInputElement>(null);

  const previousDisable = usePrevious(disabled);
  useEffect(() => {
    if (
      inputRef &&
      autoFocusOnEnable &&
      previousDisable === true &&
      !disabled
    ) {
      inputRef.current?.focus();
    }
  }, [inputRef, autoFocusOnEnable, disabled, previousDisable]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInvalidInput = (e: Event) => {
      e.preventDefault();
      setShowValidationError(true);
    };

    const handleInputChange = (e: Event) => {
      if (!e.target) return;

      if (isValidEmail((e.target as HTMLInputElement).value)) {
        setShowValidationError(false);
      }
    };

    input.addEventListener("invalid", handleInvalidInput);
    input.addEventListener("input", handleInputChange);

    return () => {
      input.removeEventListener("invalid", handleInvalidInput);
      input.removeEventListener("input", handleInputChange);
    };
  }, [inputRef, setShowValidationError]);

  return (
    <div className={classNames("relative w-full transition-all select-none")}>
      <div
        className={inputContainerClassNames({
          variant,
          hasError: displayError,
          extraClassName: className,
          hasIcon: !!icon,
        })}
      >
        <input
          ref={inputRef}
          type="email"
          required
          className={inputClassNames({
            variant,
            extraClassName: inputClassName,
          })}
          disabled={disabled || pending}
          {...inputProps}
        />
        <button
          className={classNames(
            "transition-all shrink-0 bg-krakenPurple rounded-full m-1 text-white disabled:opacity-50 peer flex items-center justify-center group outline-none",
            { "bg-redMagic-400": displayError },
            {
              "size-12": sizeVariant !== "large",
              "size-14": sizeVariant === "large",
            }
          )}
          type="submit"
          disabled={disabled || pending}
          aria-label="Submit"
        >
          {!pending ? (
            <motion.div
              key="arrow"
              transition={transition}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ArrowRightIcon
                size="icon-lg"
                className="group-hover:ml-1 transition-all"
                enforce="white"
              />
            </motion.div>
          ) : (
            <motion.div
              key="loader"
              transition={transition}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Loader />
            </motion.div>
          )}
        </button>

        {icon && <div className={inputIconClassNames()}>{icon}</div>}
      </div>

      {displayError && (
        <div className="absolute left-1 -bottom-[30px] flex items-center gap-1 z-10 text-sm text-redMagic-400">
          <CircleExclamationMarkIcon
            size="icon-md"
            className="text-redMagic-400"
          />
          Enter a valid email address
        </div>
      )}

      {children}
    </div>
  );
};
