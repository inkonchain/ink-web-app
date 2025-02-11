import { ThemedIcon } from "../ThemedIcon";
import { type IconProps, iconProps } from "../types";

export const BuildersBulletIcon: React.FC<IconProps> = (props) => {
  return <ThemedIcon {...props} Light={BuildersLight} Dark={BuildersDark} />;
};

const BuildersLight: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.73 4.98C21.73 4.98 21.73 4.99 21.72 5C23.15 6.97 24 9.39 24 12C24 14.61 23.15 17.03 21.72 19C21.72 19 21.72 19.01 21.73 19.02C20.98 20.06 20.06 20.98 19.02 21.73C19.02 21.73 19.01 21.73 19 21.72C17.03 23.15 14.61 24 12 24C9.39 24 6.97 23.15 5 21.72C5 21.72 4.99 21.72 4.98 21.73C3.94 20.98 3.02 20.06 2.27 19.02C2.27 19.02 2.27 19.01 2.28 19C0.85 17.03 0 14.61 0 12C0 9.39 0.85 6.97 2.28 5C2.28 5 2.28 4.99 2.27 4.98C3.02 3.94 3.94 3.02 4.98 2.27C4.98 2.27 4.99 2.27 5 2.28C6.97 0.85 9.39 0 12 0C14.61 0 17.03 0.85 19 2.28C19 2.28 19.01 2.28 19.02 2.27C20.06 3.02 20.98 3.94 21.73 4.98ZM5.94 20.08C5.94 20.41 6.04 20.76 6.32 20.94C7.96 21.99 9.92 22.61 12 22.61C14.08 22.61 16.04 21.99 17.68 20.94C17.96 20.76 18.06 20.42 18.06 20.08C18.06 18.97 18.97 18.06 20.08 18.06C20.41 18.06 20.76 17.96 20.94 17.68C21.99 16.04 22.61 14.08 22.61 12C22.61 9.92 21.99 7.96 20.94 6.32C20.76 6.04 20.42 5.94 20.08 5.94C18.97 5.94 18.06 5.03 18.06 3.92C18.06 3.59 17.96 3.24 17.68 3.06C16.04 2.01 14.08 1.39 12 1.39C9.92 1.39 7.96 2.01 6.32 3.06C6.04 3.24 5.94 3.58 5.94 3.92C5.94 5.03 5.03 5.94 3.92 5.94C3.59 5.94 3.24 6.04 3.06 6.32C2.01 7.96 1.39 9.92 1.39 12C1.39 14.08 2.01 16.04 3.06 17.68C3.24 17.96 3.58 18.06 3.92 18.06C5.03 18.06 5.94 18.97 5.94 20.08Z"
        fill="url(#paint0_radial_3017_11507)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.73 4.98C21.73 4.98 21.73 4.99 21.72 5C23.15 6.97 24 9.39 24 12C24 14.61 23.15 17.03 21.72 19C21.72 19 21.72 19.01 21.73 19.02C20.98 20.06 20.06 20.98 19.02 21.73C19.02 21.73 19.01 21.73 19 21.72C17.03 23.15 14.61 24 12 24C9.39 24 6.97 23.15 5 21.72C5 21.72 4.99 21.72 4.98 21.73C3.94 20.98 3.02 20.06 2.27 19.02C2.27 19.02 2.27 19.01 2.28 19C0.85 17.03 0 14.61 0 12C0 9.39 0.85 6.97 2.28 5C2.28 5 2.28 4.99 2.27 4.98C3.02 3.94 3.94 3.02 4.98 2.27C4.98 2.27 4.99 2.27 5 2.28C6.97 0.85 9.39 0 12 0C14.61 0 17.03 0.85 19 2.28C19 2.28 19.01 2.28 19.02 2.27C20.06 3.02 20.98 3.94 21.73 4.98ZM5.94 20.08C5.94 20.41 6.04 20.76 6.32 20.94C7.96 21.99 9.92 22.61 12 22.61C14.08 22.61 16.04 21.99 17.68 20.94C17.96 20.76 18.06 20.42 18.06 20.08C18.06 18.97 18.97 18.06 20.08 18.06C20.41 18.06 20.76 17.96 20.94 17.68C21.99 16.04 22.61 14.08 22.61 12C22.61 9.92 21.99 7.96 20.94 6.32C20.76 6.04 20.42 5.94 20.08 5.94C18.97 5.94 18.06 5.03 18.06 3.92C18.06 3.59 17.96 3.24 17.68 3.06C16.04 2.01 14.08 1.39 12 1.39C9.92 1.39 7.96 2.01 6.32 3.06C6.04 3.24 5.94 3.58 5.94 3.92C5.94 5.03 5.03 5.94 3.92 5.94C3.59 5.94 3.24 6.04 3.06 6.32C2.01 7.96 1.39 9.92 1.39 12C1.39 14.08 2.01 16.04 3.06 17.68C3.24 17.96 3.58 18.06 3.92 18.06C5.03 18.06 5.94 18.97 5.94 20.08Z"
        fill="url(#paint1_radial_3017_11507)"
      />
      <path
        d="M16 10.92V15.37C16 16.02 16.63 16.5 17.24 16.3C18.84 15.78 20 14.27 20 12.5V10.81C20 9.6 18.92 8.63 17.66 8.84C16.68 9 16 9.92 16 10.92Z"
        fill="url(#paint2_radial_3017_11507)"
      />
      <path
        d="M16 10.92V15.37C16 16.02 16.63 16.5 17.24 16.3C18.84 15.78 20 14.27 20 12.5V10.81C20 9.6 18.92 8.63 17.66 8.84C16.68 9 16 9.92 16 10.92Z"
        fill="url(#paint3_radial_3017_11507)"
      />
      <path
        d="M8 13.43V9.34C8 8.6 8.6 7.99 9.35 7.99H14.42C15.42 7.99 16.34 7.31 16.5 6.33C16.7 5.08 15.74 3.99 14.53 3.99H11.01C9.43 3.99 8.06 4.91 7.42 6.25C7.18 6.75 6.77 7.16 6.27 7.4C4.93 8.05 4.01 9.41 4.01 10.99V13.53C4.01 14.74 5.09 15.71 6.35 15.5C7.33 15.34 8.01 14.42 8.01 13.42H8V13.43Z"
        fill="url(#paint4_radial_3017_11507)"
      />
      <path
        d="M8 13.43V9.34C8 8.6 8.6 7.99 9.35 7.99H14.42C15.42 7.99 16.34 7.31 16.5 6.33C16.7 5.08 15.74 3.99 14.53 3.99H11.01C9.43 3.99 8.06 4.91 7.42 6.25C7.18 6.75 6.77 7.16 6.27 7.4C4.93 8.05 4.01 9.41 4.01 10.99V13.53C4.01 14.74 5.09 15.71 6.35 15.5C7.33 15.34 8.01 14.42 8.01 13.42H8V13.43Z"
        fill="url(#paint5_radial_3017_11507)"
      />
      <path
        d="M12.28 16H9.86C8.86 16 7.94 16.68 7.78 17.66C7.58 18.91 8.54 20 9.75 20H15.02C15.78 20 16.28 19.23 16 18.53C15.41 17.05 13.97 16 12.28 16Z"
        fill="url(#paint6_radial_3017_11507)"
      />
      <path
        d="M12.28 16H9.86C8.86 16 7.94 16.68 7.78 17.66C7.58 18.91 8.54 20 9.75 20H15.02C15.78 20 16.28 19.23 16 18.53C15.41 17.05 13.97 16 12.28 16Z"
        fill="url(#paint7_radial_3017_11507)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37933) rotate(129.211) scale(42.0043 132.03)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37933) rotate(129.211) scale(42.0043 132.03)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37933) rotate(129.211) scale(42.0043 132.03)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint7_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37933) rotate(129.211) scale(42.0043 132.03)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const BuildersDark: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.73 4.98C21.73 4.98 21.73 4.99 21.72 5C23.15 6.97 24 9.39 24 12C24 14.61 23.15 17.03 21.72 19C21.72 19 21.72 19.01 21.73 19.02C20.98 20.06 20.06 20.98 19.02 21.73C19.02 21.73 19.01 21.73 19 21.72C17.03 23.15 14.61 24 12 24C9.39 24 6.97 23.15 5 21.72C5 21.72 4.99 21.72 4.98 21.73C3.94 20.98 3.02 20.06 2.27 19.02C2.27 19.02 2.27 19.01 2.28 19C0.85 17.03 0 14.61 0 12C0 9.39 0.85 6.97 2.28 5C2.28 5 2.28 4.99 2.27 4.98C3.02 3.94 3.94 3.02 4.98 2.27C4.98 2.27 4.99 2.27 5 2.28C6.97 0.85 9.39 0 12 0C14.61 0 17.03 0.85 19 2.28C19 2.28 19.01 2.28 19.02 2.27C20.06 3.02 20.98 3.94 21.73 4.98ZM5.94 20.08C5.94 20.41 6.04 20.76 6.32 20.94C7.96 21.99 9.92 22.61 12 22.61C14.08 22.61 16.04 21.99 17.68 20.94C17.96 20.76 18.06 20.42 18.06 20.08C18.06 18.97 18.97 18.06 20.08 18.06C20.41 18.06 20.76 17.96 20.94 17.68C21.99 16.04 22.61 14.08 22.61 12C22.61 9.92 21.99 7.96 20.94 6.32C20.76 6.04 20.42 5.94 20.08 5.94C18.97 5.94 18.06 5.03 18.06 3.92C18.06 3.59 17.96 3.24 17.68 3.06C16.04 2.01 14.08 1.39 12 1.39C9.92 1.39 7.96 2.01 6.32 3.06C6.04 3.24 5.94 3.58 5.94 3.92C5.94 5.03 5.03 5.94 3.92 5.94C3.59 5.94 3.24 6.04 3.06 6.32C2.01 7.96 1.39 9.92 1.39 12C1.39 14.08 2.01 16.04 3.06 17.68C3.24 17.96 3.58 18.06 3.92 18.06C5.03 18.06 5.94 18.97 5.94 20.08Z"
        fill="url(#paint0_radial_3017_11507)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.73 4.98C21.73 4.98 21.73 4.99 21.72 5C23.15 6.97 24 9.39 24 12C24 14.61 23.15 17.03 21.72 19C21.72 19 21.72 19.01 21.73 19.02C20.98 20.06 20.06 20.98 19.02 21.73C19.02 21.73 19.01 21.73 19 21.72C17.03 23.15 14.61 24 12 24C9.39 24 6.97 23.15 5 21.72C5 21.72 4.99 21.72 4.98 21.73C3.94 20.98 3.02 20.06 2.27 19.02C2.27 19.02 2.27 19.01 2.28 19C0.85 17.03 0 14.61 0 12C0 9.39 0.85 6.97 2.28 5C2.28 5 2.28 4.99 2.27 4.98C3.02 3.94 3.94 3.02 4.98 2.27C4.98 2.27 4.99 2.27 5 2.28C6.97 0.85 9.39 0 12 0C14.61 0 17.03 0.85 19 2.28C19 2.28 19.01 2.28 19.02 2.27C20.06 3.02 20.98 3.94 21.73 4.98ZM5.94 20.08C5.94 20.41 6.04 20.76 6.32 20.94C7.96 21.99 9.92 22.61 12 22.61C14.08 22.61 16.04 21.99 17.68 20.94C17.96 20.76 18.06 20.42 18.06 20.08C18.06 18.97 18.97 18.06 20.08 18.06C20.41 18.06 20.76 17.96 20.94 17.68C21.99 16.04 22.61 14.08 22.61 12C22.61 9.92 21.99 7.96 20.94 6.32C20.76 6.04 20.42 5.94 20.08 5.94C18.97 5.94 18.06 5.03 18.06 3.92C18.06 3.59 17.96 3.24 17.68 3.06C16.04 2.01 14.08 1.39 12 1.39C9.92 1.39 7.96 2.01 6.32 3.06C6.04 3.24 5.94 3.58 5.94 3.92C5.94 5.03 5.03 5.94 3.92 5.94C3.59 5.94 3.24 6.04 3.06 6.32C2.01 7.96 1.39 9.92 1.39 12C1.39 14.08 2.01 16.04 3.06 17.68C3.24 17.96 3.58 18.06 3.92 18.06C5.03 18.06 5.94 18.97 5.94 20.08Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.73 4.98C21.73 4.98 21.73 4.99 21.72 5C23.15 6.97 24 9.39 24 12C24 14.61 23.15 17.03 21.72 19C21.72 19 21.72 19.01 21.73 19.02C20.98 20.06 20.06 20.98 19.02 21.73C19.02 21.73 19.01 21.73 19 21.72C17.03 23.15 14.61 24 12 24C9.39 24 6.97 23.15 5 21.72C5 21.72 4.99 21.72 4.98 21.73C3.94 20.98 3.02 20.06 2.27 19.02C2.27 19.02 2.27 19.01 2.28 19C0.85 17.03 0 14.61 0 12C0 9.39 0.85 6.97 2.28 5C2.28 5 2.28 4.99 2.27 4.98C3.02 3.94 3.94 3.02 4.98 2.27C4.98 2.27 4.99 2.27 5 2.28C6.97 0.85 9.39 0 12 0C14.61 0 17.03 0.85 19 2.28C19 2.28 19.01 2.28 19.02 2.27C20.06 3.02 20.98 3.94 21.73 4.98ZM5.94 20.08C5.94 20.41 6.04 20.76 6.32 20.94C7.96 21.99 9.92 22.61 12 22.61C14.08 22.61 16.04 21.99 17.68 20.94C17.96 20.76 18.06 20.42 18.06 20.08C18.06 18.97 18.97 18.06 20.08 18.06C20.41 18.06 20.76 17.96 20.94 17.68C21.99 16.04 22.61 14.08 22.61 12C22.61 9.92 21.99 7.96 20.94 6.32C20.76 6.04 20.42 5.94 20.08 5.94C18.97 5.94 18.06 5.03 18.06 3.92C18.06 3.59 17.96 3.24 17.68 3.06C16.04 2.01 14.08 1.39 12 1.39C9.92 1.39 7.96 2.01 6.32 3.06C6.04 3.24 5.94 3.58 5.94 3.92C5.94 5.03 5.03 5.94 3.92 5.94C3.59 5.94 3.24 6.04 3.06 6.32C2.01 7.96 1.39 9.92 1.39 12C1.39 14.08 2.01 16.04 3.06 17.68C3.24 17.96 3.58 18.06 3.92 18.06C5.03 18.06 5.94 18.97 5.94 20.08Z"
        fill="url(#paint1_radial_3017_11507)"
      />
      <path
        d="M16 10.92V15.37C16 16.02 16.63 16.5 17.24 16.3C18.84 15.78 20 14.27 20 12.5V10.81C20 9.6 18.92 8.63 17.66 8.84C16.68 9 16 9.92 16 10.92Z"
        fill="url(#paint2_radial_3017_11507)"
      />
      <path
        d="M16 10.92V15.37C16 16.02 16.63 16.5 17.24 16.3C18.84 15.78 20 14.27 20 12.5V10.81C20 9.6 18.92 8.63 17.66 8.84C16.68 9 16 9.92 16 10.92Z"
        fill="white"
      />
      <path
        d="M16 10.92V15.37C16 16.02 16.63 16.5 17.24 16.3C18.84 15.78 20 14.27 20 12.5V10.81C20 9.6 18.92 8.63 17.66 8.84C16.68 9 16 9.92 16 10.92Z"
        fill="url(#paint3_radial_3017_11507)"
      />
      <path
        d="M8 13.43V9.34C8 8.6 8.6 7.99 9.35 7.99H14.42C15.42 7.99 16.34 7.31 16.5 6.33C16.7 5.08 15.74 3.99 14.53 3.99H11.01C9.43 3.99 8.06 4.91 7.42 6.25C7.18 6.75 6.77 7.16 6.27 7.4C4.93 8.05 4.01 9.41 4.01 10.99V13.53C4.01 14.74 5.09 15.71 6.35 15.5C7.33 15.34 8.01 14.42 8.01 13.42H8V13.43Z"
        fill="url(#paint4_radial_3017_11507)"
      />
      <path
        d="M8 13.43V9.34C8 8.6 8.6 7.99 9.35 7.99H14.42C15.42 7.99 16.34 7.31 16.5 6.33C16.7 5.08 15.74 3.99 14.53 3.99H11.01C9.43 3.99 8.06 4.91 7.42 6.25C7.18 6.75 6.77 7.16 6.27 7.4C4.93 8.05 4.01 9.41 4.01 10.99V13.53C4.01 14.74 5.09 15.71 6.35 15.5C7.33 15.34 8.01 14.42 8.01 13.42H8V13.43Z"
        fill="white"
      />
      <path
        d="M8 13.43V9.34C8 8.6 8.6 7.99 9.35 7.99H14.42C15.42 7.99 16.34 7.31 16.5 6.33C16.7 5.08 15.74 3.99 14.53 3.99H11.01C9.43 3.99 8.06 4.91 7.42 6.25C7.18 6.75 6.77 7.16 6.27 7.4C4.93 8.05 4.01 9.41 4.01 10.99V13.53C4.01 14.74 5.09 15.71 6.35 15.5C7.33 15.34 8.01 14.42 8.01 13.42H8V13.43Z"
        fill="url(#paint5_radial_3017_11507)"
      />
      <path
        d="M12.28 16H9.86C8.86 16 7.94 16.68 7.78 17.66C7.58 18.91 8.54 20 9.75 20H15.02C15.78 20 16.28 19.23 16 18.53C15.41 17.05 13.97 16 12.28 16Z"
        fill="url(#paint6_radial_3017_11507)"
      />
      <path
        d="M12.28 16H9.86C8.86 16 7.94 16.68 7.78 17.66C7.58 18.91 8.54 20 9.75 20H15.02C15.78 20 16.28 19.23 16 18.53C15.41 17.05 13.97 16 12.28 16Z"
        fill="white"
      />
      <path
        d="M12.28 16H9.86C8.86 16 7.94 16.68 7.78 17.66C7.58 18.91 8.54 20 9.75 20H15.02C15.78 20 16.28 19.23 16 18.53C15.41 17.05 13.97 16 12.28 16Z"
        fill="url(#paint7_radial_3017_11507)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37932) rotate(112.241) scale(46.0705 65.8683)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37932) rotate(112.241) scale(46.0705 65.8683)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37932) rotate(112.241) scale(46.0705 65.8683)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 -0.0758096) rotate(90) scale(24.1517)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint7_radial_3017_11507"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.453 -2.37932) rotate(112.241) scale(46.0705 65.8683)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
