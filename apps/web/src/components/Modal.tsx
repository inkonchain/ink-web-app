import { PropsWithChildren } from "react";

import { classNames } from "@/util/classes";

export interface ModalContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalContainer: React.FC<
  PropsWithChildren<ModalContainerProps>
> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <div className={classNames("fixed inset-0 ", className)} {...rest}>
      {children}
    </div>
  );
};

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  const { isOpen, children, className, ...rest } = props;
  return (
    <div
      className={classNames(
        "absolute inset-0 top-0 translate-y-full transition-transform bg-whiteMagic/50 dark:bg-blackMagic/50 backdrop-blur-xl z-10 overflow-hidden",
        {
          "duration-75 translate-y-0": isOpen,
        },
        className
      )}
      role={isOpen ? "dialog" : undefined}
      aria-modal={isOpen ? "true" : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};
