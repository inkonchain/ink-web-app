import Image, { ImageProps } from "next/image";

const icons = {
  mail: {
    src: "/icons/mail.svg",
    width: 20,
    height: 20,
    alt: "mail",
  },
} as const satisfies Record<string, ImageProps>;

export interface IconProps {
  name: keyof typeof icons;
}

export const Icon: React.FC<IconProps> = ({ name }) => {
  return <Image {...icons[name]} alt={icons[name].alt} />;
};
