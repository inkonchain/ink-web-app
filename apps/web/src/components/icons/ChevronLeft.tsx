import { type IconProps, iconProps } from "./types";

export const ChevronLeftIcon: React.FC<IconProps> = (props) => {
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
        d="M14.9483 6.29289C15.3388 6.68342 15.3388 7.31658 14.9483 7.70711L10.8321 11.8232C10.7345 11.9209 10.7345 12.0791 10.8321 12.1768L14.9483 16.2929C15.3388 16.6834 15.3388 17.3166 14.9483 17.7071C14.5577 18.0976 13.9246 18.0976 13.534 17.7071L9.41792 13.591C8.53924 12.7123 8.53924 11.2877 9.41792 10.409L13.534 6.29289C13.9246 5.90237 14.5577 5.90237 14.9483 6.29289Z"
        fill="currentColor"
      />
    </svg>
  );
};
