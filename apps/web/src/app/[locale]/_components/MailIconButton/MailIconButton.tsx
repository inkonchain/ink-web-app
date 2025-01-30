"use client";

import { EmailIcon } from "@/components/icons/Email";
import { IconProps } from "@/components/icons/types";
import { useNewsletterModalContext } from "@/components/NewsletterModal/NewsletterModalContext";

interface MailButtonIconProps {
  className: string;
  iconProps: Omit<IconProps, "size">;
}

export const MailIconButton: React.FC<MailButtonIconProps> = ({
  className,
  iconProps,
}) => {
  const context = useNewsletterModalContext();

  return (
    <button
      className={className}
      name="mail-icon-button"
      aria-label="newsletter"
      onClick={() => {
        context.setIsOpen(true);
      }}
    >
      <EmailIcon {...iconProps} size={"icon-lg"} />
    </button>
  );
};
