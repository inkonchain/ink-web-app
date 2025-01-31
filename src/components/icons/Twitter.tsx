import { type IconProps, iconProps } from "./types";

export const TwitterIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 24"
      fill="none"
    >
      <path
        d="M13.8429 10.2772L22.0389 0.75H20.0967L12.9801 9.02235L7.29607 0.75H0.740234L9.33558 13.2593L0.740234 23.25H2.68254L10.1979 14.5141L16.2006 23.25H22.7564L13.8424 10.2772H13.8429ZM11.1826 13.3695L10.3117 12.1238L3.38238 2.21214H6.36565L11.9577 10.2112L12.8286 11.4568L20.0976 21.8544H17.1143L11.1826 13.3699V13.3695Z"
        fill="currentColor"
      />
    </svg>
  );
};
