import { type IconProps, iconProps } from "./types";

export const ArrowRightIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      viewBox="0 0 24 25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.082 6.04997C14.4725 5.65945 15.1056 5.65945 15.4962 6.04997L20.082 10.6357C21.2535 11.8073 21.2535 13.7068 20.082 14.8784L15.4962 19.4642C15.1056 19.8547 14.4725 19.8547 14.082 19.4642C13.6914 19.0737 13.6914 18.4405 14.082 18.05L18.3748 13.7571H4.03906C3.48678 13.7571 3.03906 13.3094 3.03906 12.7571C3.03906 12.2048 3.48678 11.7571 4.03906 11.7571H18.3749L14.082 7.46419C13.6914 7.07366 13.6914 6.4405 14.082 6.04997Z"
        fill="currentColor"
      />
    </svg>
  );
};
