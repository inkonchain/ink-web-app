import { type IconProps, iconProps } from "./types";

export const ChevronRightIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.0518 6.29289C9.44233 5.90237 10.0755 5.90237 10.466 6.29289L14.5821 10.409C15.4608 11.2877 15.4608 12.7123 14.5821 13.591L10.466 17.7071C10.0755 18.0976 9.44233 18.0976 9.0518 17.7071C8.66128 17.3166 8.66128 16.6834 9.0518 16.2929L13.1679 12.1768C13.2656 12.0791 13.2656 11.9209 13.1679 11.8232L9.0518 7.70711C8.66128 7.31658 8.66128 6.68342 9.0518 6.29289Z"
        fill="currentColor"
      />
    </svg>
  );
};
