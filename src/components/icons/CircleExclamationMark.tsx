import { type IconProps, iconProps } from "./types";

export const CircleExclamationMarkIcon: React.FC<IconProps> = (props) => {
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
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5V11.624C12.75 12.0382 12.4142 12.374 12 12.374C11.5858 12.374 11.25 12.0382 11.25 11.624V7.5C11.25 7.08579 11.5858 6.75 12 6.75ZM12.75 14.686C12.75 14.2718 12.4142 13.936 12 13.936C11.5858 13.936 11.25 14.2718 11.25 14.686V15.717C11.25 16.1313 11.5858 16.467 12 16.467C12.4142 16.467 12.75 16.1313 12.75 15.717V14.686Z"
        fill="currentColor"
      />
    </svg>
  );
};
