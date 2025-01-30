import { type IconProps, iconProps } from "./types";

export const BurgerIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="5" width="20" height="2" fill="currentColor" />
      <rect x="2" y="11" width="20" height="2" fill="currentColor" />
      <rect x="2" y="17" width="20" height="2" fill="currentColor" />
    </svg>
  );
};
