import { HrefProp, isExternalPath, Link, pathFromHrefProp } from "@/routing";
import { classNames } from "@/util/classes";

import { ArrowRightIcon } from "./icons/ArrowRight";
import { ArrowTopRightIcon } from "./icons/ArrowTopRight";
import { IconProps } from "./icons/types";
import { KeyboardShortcut } from "./KeyboardShortcut";
import { TextUnderline } from "./TextUnderline";

export type NavLinkVariants = "lg" | "xl";

export interface NavLinkProps {
  href: HrefProp;
  variant: NavLinkVariants;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  enforce?: "black" | "white";
  shortcutLetter?: string;
  className?: string;
}

const variantToIconSize = {
  lg: "icon-md",
  xl: "icon-xl",
} satisfies Record<NavLinkVariants, IconProps["size"]>;

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  variant,
  disabled,
  children,
  icon,
  enforce,
  shortcutLetter,
  className,
}) => {
  const isExternalLink = isExternalPath(pathFromHrefProp(href));

  const underlineArrow = !icon;
  const iconSize = variantToIconSize[variant];

  return (
    <div className={classNames("flex", className)}>
      <Link
        className={classNames(
          "flex items-center justify-center gap-2 w-fit relative group",
          {
            "text-linkLg": variant === "xl",
            "text-linkSm": variant === "lg",
          },
          {
            " opacity-50 select-none": disabled,
          }
        )}
        href={href}
        aria-disabled={disabled}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        <div className="relative inline-block">
          {children}
          {!underlineArrow && <TextUnderline enforce={enforce} />}
        </div>

        <span className="transition-[padding] group-hover:pl-2 duration-600 group-hover:duration-150">
          {icon ? (
            icon
          ) : isExternalLink ? (
            <ArrowTopRightIcon size={iconSize} enforce={enforce} />
          ) : (
            <ArrowRightIcon size={iconSize} enforce={enforce} />
          )}
        </span>

        {underlineArrow && <TextUnderline enforce={enforce} />}
      </Link>

      {shortcutLetter && <KeyboardShortcut letter={shortcutLetter} />}
    </div>
  );
};
