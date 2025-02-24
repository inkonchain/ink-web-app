import { PropsWithChildren } from "react";
import FocusLock from "react-focus-lock";

import { classNames } from "@/util/classes";

import { CloseIcon } from "./icons/Close";

export interface ModalContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CenteredModalContainer: React.FC<
  PropsWithChildren<ModalContainerProps>
> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={classNames("fixed inset-0 z-20 m-4 sm:m-24", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export interface CenteredModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  closeModal: () => void;
  contentClassName?: string;
  scrollable?: boolean;
}

export const CenteredModal: React.FC<PropsWithChildren<CenteredModalProps>> = (
  props
) => {
  const {
    isOpen,
    closeModal,
    children,
    className,
    contentClassName,
    scrollable = false,
    ...rest
  } = props;

  if (!isOpen) return null;

  return (
    <FocusLock disabled={!isOpen}>
      <div
        className={classNames(
          "absolute inset-0 opacity-0 transition-opacity flex items-center justify-center z-50 pointer-events-none",
          {
            "duration-75 opacity-100": isOpen,
            hidden: !isOpen,
          },
          className
        )}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        data-testid="centered-modal"
        {...rest}
      >
        <div
          className={classNames(
            "relative bg-white rounded-4xl text-blackMagic pointer-events-auto",
            contentClassName
          )}
        >
          <button
            className="absolute top-0 right-0 p-6 focus-visible:outline-hidden focus-visible:opacity-60"
            onClick={closeModal}
          >
            <CloseIcon size="icon-md" enforce="inherit" />
          </button>
          <div
            className={classNames(
              "max-h-[calc(90vh-32px)]",
              scrollable
                ? "p-6 m-8 overflow-y-scroll scrollbar-custom mt-14"
                : "m-4 px-6 py-8 overflow-visible"
            )}
          >
            <div
              className={classNames({
                "h-full w-full overflow-y-visible": scrollable,
              })}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
};
