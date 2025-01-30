import { classNames } from "@/util/classes";

export interface CollapsiblePopupProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  forceHover?: boolean;
}

export const CollapsiblePopup: React.FC<CollapsiblePopupProps> = ({
  className,
  isOpen,
  children,
  forceHover,
}) => {
  return (
    <div
      className={classNames(
        "absolute inset-0 top-[calc(100%-4rem)] sm:top-[calc(100%-3.5rem)] transition-[top,border-top-left-radius,border-top-right-radius] overflow-hidden bg-whiteMagic/90 dark:bg-blackMagic/90 backdrop-blur-xl",
        {
          "top-[calc(100%-5rem)] sm:top-[calc(100%-5rem)]": forceHover,
          "top-24 sm:top-24 duration-75 hover:delay-0": isOpen,
          "hover:top-[calc(100%-5rem)] hover:sm:top-[calc(100%-5rem)] delay-0":
            !isOpen,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
