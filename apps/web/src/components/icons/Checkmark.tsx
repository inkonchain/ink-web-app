import { type IconProps, iconProps } from "./types";

export const CheckmarkIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5905 0.748484C12.0362 1.07459 12.1332 1.70028 11.8071 2.14601L5.30384 11.0349C5.14317 11.2545 4.89996 11.3992 4.6303 11.4355C4.36064 11.4718 4.08781 11.3967 3.87476 11.2274L0.378025 8.44967C-0.0544173 8.10614 -0.126496 7.47709 0.217033 7.04465C0.560562 6.6122 1.18961 6.54013 1.62205 6.88365L4.30408 9.01423L10.193 0.965086C10.5191 0.519357 11.1448 0.422381 11.5905 0.748484Z"
        fill="currentColor"
      />
    </svg>
  );
};
