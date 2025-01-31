import { ThemedIcon } from "./ThemedIcon";
import { type IconProps, iconProps } from "./types";

export const DotsInCircleIcon: React.FC<IconProps> = (props) => {
  return (
    <ThemedIcon {...props} Light={DotsInCircleLight} Dark={DotsInCircleDark} />
  );
};

const DotsInCircleLight: React.FC<Exclude<IconProps, "enforce">> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M11.997 2.68977C11.997 4.04544 11.2294 4.68655 10.0001 4.68655C8.77077 4.68655 8.00317 4.04544 8.00317 2.68977C8.00317 1.3341 8.77077 0.692993 10.0001 0.692993C11.2294 0.692993 11.997 1.3341 11.997 2.68977Z"
        fill="url(#paint0_radial_1546_290)"
      />
      <path
        d="M11.997 2.68977C11.997 4.04544 11.2294 4.68655 10.0001 4.68655C8.77077 4.68655 8.00317 4.04544 8.00317 2.68977C8.00317 1.3341 8.77077 0.692993 10.0001 0.692993C11.2294 0.692993 11.997 1.3341 11.997 2.68977Z"
        fill="url(#paint1_radial_1546_290)"
      />
      <path
        d="M11.997 18.695C11.997 20.0507 11.2294 20.6918 10.0001 20.6918C8.77077 20.6918 8.00317 20.0507 8.00317 18.695C8.00317 17.3394 8.77077 16.6983 10.0001 16.6983C11.2294 16.6983 11.997 17.3394 11.997 18.695Z"
        fill="url(#paint2_radial_1546_290)"
      />
      <path
        d="M11.997 18.695C11.997 20.0507 11.2294 20.6918 10.0001 20.6918C8.77077 20.6918 8.00317 20.0507 8.00317 18.695C8.00317 17.3394 8.77077 16.6983 10.0001 16.6983C11.2294 16.6983 11.997 17.3394 11.997 18.695Z"
        fill="url(#paint3_radial_1546_290)"
      />
      <path
        d="M1.99692 8.69561C3.35269 8.69561 3.99384 9.46316 3.99384 10.6924C3.99384 11.9216 3.35269 12.6892 1.99692 12.6892C0.641156 12.6892 5.37353e-08 11.9216 0 10.6924C-5.37349e-08 9.46316 0.641156 8.69561 1.99692 8.69561Z"
        fill="url(#paint4_radial_1546_290)"
      />
      <path
        d="M1.99692 8.69561C3.35269 8.69561 3.99384 9.46316 3.99384 10.6924C3.99384 11.9216 3.35269 12.6892 1.99692 12.6892C0.641156 12.6892 5.37353e-08 11.9216 0 10.6924C-5.37349e-08 9.46316 0.641156 8.69561 1.99692 8.69561Z"
        fill="url(#paint5_radial_1546_290)"
      />
      <path
        d="M18.0034 8.69561C19.3591 8.69561 20.0003 9.46316 20.0003 10.6924C20.0003 11.9216 19.3591 12.6892 18.0034 12.6892C16.6476 12.6892 16.0064 11.9216 16.0064 10.6924C16.0064 9.46316 16.6476 8.69561 18.0034 8.69561Z"
        fill="url(#paint6_radial_1546_290)"
      />
      <path
        d="M18.0034 8.69561C19.3591 8.69561 20.0003 9.46316 20.0003 10.6924C20.0003 11.9216 19.3591 12.6892 18.0034 12.6892C16.6476 12.6892 16.0064 11.9216 16.0064 10.6924C16.0064 9.46316 16.6476 8.69561 18.0034 8.69561Z"
        fill="url(#paint7_radial_1546_290)"
      />
      <path
        d="M5.75303 3.62182C6.7117 4.58042 6.62229 5.57649 5.75303 6.44568C4.88378 7.31488 3.88763 7.40428 2.92896 6.44568C1.97029 5.48708 2.0597 4.49101 2.92896 3.62182C3.79822 2.75262 4.79436 2.66322 5.75303 3.62182Z"
        fill="url(#paint8_radial_1546_290)"
      />
      <path
        d="M5.75303 3.62182C6.7117 4.58042 6.62229 5.57649 5.75303 6.44568C4.88378 7.31488 3.88763 7.40428 2.92896 6.44568C1.97029 5.48708 2.0597 4.49101 2.92896 3.62182C3.79822 2.75262 4.79436 2.66322 5.75303 3.62182Z"
        fill="url(#paint9_radial_1546_290)"
      />
      <path
        d="M17.0713 14.9393C18.03 15.8979 17.9406 16.8939 17.0713 17.7631C16.202 18.6323 15.2059 18.7217 14.2472 17.7631C13.2886 16.8045 13.378 15.8084 14.2472 14.9393C15.1165 14.0701 16.1126 13.9807 17.0713 14.9393Z"
        fill="url(#paint10_radial_1546_290)"
      />
      <path
        d="M17.0713 14.9393C18.03 15.8979 17.9406 16.8939 17.0713 17.7631C16.202 18.6323 15.2059 18.7217 14.2472 17.7631C13.2886 16.8045 13.378 15.8084 14.2472 14.9393C15.1165 14.0701 16.1126 13.9807 17.0713 14.9393Z"
        fill="url(#paint11_radial_1546_290)"
      />
      <path
        d="M2.92898 14.9392C3.88766 13.9806 4.8838 14.07 5.75306 14.9392C6.62231 15.8084 6.71172 16.8045 5.75305 17.7631C4.79438 18.7217 3.79824 18.6323 2.92898 17.7631C2.05972 16.8939 1.97031 15.8978 2.92898 14.9392Z"
        fill="url(#paint12_radial_1546_290)"
      />
      <path
        d="M2.92898 14.9392C3.88766 13.9806 4.8838 14.07 5.75306 14.9392C6.62231 15.8084 6.71172 16.8045 5.75305 17.7631C4.79438 18.7217 3.79824 18.6323 2.92898 17.7631C2.05972 16.8939 1.97031 15.8978 2.92898 14.9392Z"
        fill="url(#paint13_radial_1546_290)"
      />
      <path
        d="M14.2472 3.62177C15.2059 2.66316 16.2021 2.75257 17.0713 3.62176C17.9406 4.49096 18.03 5.48703 17.0713 6.44563C16.1126 7.40423 15.1165 7.31482 14.2472 6.44563C13.378 5.57644 13.2886 4.58037 14.2472 3.62177Z"
        fill="url(#paint14_radial_1546_290)"
      />
      <path
        d="M14.2472 3.62177C15.2059 2.66316 16.2021 2.75257 17.0713 3.62176C17.9406 4.49096 18.03 5.48703 17.0713 6.44563C16.1126 7.40423 15.1165 7.31482 14.2472 6.44563C13.378 5.57644 13.2886 4.58037 14.2472 3.62177Z"
        fill="url(#paint15_radial_1546_290)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint7_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint8_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint9_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint10_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint11_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint12_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint13_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint14_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.0001 0.629822) rotate(90) scale(20.1252 20.1267)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint15_radial_1546_290"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5444 -1.28966) rotate(129.213) scale(35.0026 110.023)"
        >
          <stop stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const DotsInCircleDark: React.FC<Exclude<IconProps, "enforce">> = (props) => {
  return (
    <svg
      className={iconProps(props)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M11.9968 1.99689C11.9968 3.35264 11.2292 3.99379 9.99995 3.99379C8.77065 3.99379 8.00306 3.35264 8.00306 1.99689C8.00306 0.641146 8.77065 0 9.99995 0C11.2292 0 11.9968 0.641146 11.9968 1.99689Z"
        fill="url(#paint0_radial_1726_9113)"
      />
      <path
        d="M11.9968 1.99689C11.9968 3.35264 11.2292 3.99379 9.99995 3.99379C8.77065 3.99379 8.00306 3.35264 8.00306 1.99689C8.00306 0.641146 8.77065 0 9.99995 0C11.2292 0 11.9968 0.641146 11.9968 1.99689Z"
        fill="white"
      />
      <path
        d="M11.9968 1.99689C11.9968 3.35264 11.2292 3.99379 9.99995 3.99379C8.77065 3.99379 8.00306 3.35264 8.00306 1.99689C8.00306 0.641146 8.77065 0 9.99995 0C11.2292 0 11.9968 0.641146 11.9968 1.99689Z"
        fill="url(#paint1_radial_1726_9113)"
      />
      <path
        d="M11.9968 18.0031C11.9968 19.3589 11.2292 20 9.99995 20C8.77065 20 8.00306 19.3589 8.00306 18.0031C8.00306 16.6474 8.77065 16.0062 9.99995 16.0062C11.2292 16.0062 11.9968 16.6474 11.9968 18.0031Z"
        fill="url(#paint2_radial_1726_9113)"
      />
      <path
        d="M11.9968 18.0031C11.9968 19.3589 11.2292 20 9.99995 20C8.77065 20 8.00306 19.3589 8.00306 18.0031C8.00306 16.6474 8.77065 16.0062 9.99995 16.0062C11.2292 16.0062 11.9968 16.6474 11.9968 18.0031Z"
        fill="white"
      />
      <path
        d="M11.9968 18.0031C11.9968 19.3589 11.2292 20 9.99995 20C8.77065 20 8.00306 19.3589 8.00306 18.0031C8.00306 16.6474 8.77065 16.0062 9.99995 16.0062C11.2292 16.0062 11.9968 16.6474 11.9968 18.0031Z"
        fill="url(#paint3_radial_1726_9113)"
      />
      <path
        d="M1.99689 8.00309C3.35264 8.00309 3.99379 8.77068 3.99379 9.99998C3.99379 11.2293 3.35264 11.9969 1.99689 11.9969C0.641147 11.9969 5.37345e-08 11.2293 0 9.99998C-5.37341e-08 8.77068 0.641146 8.00309 1.99689 8.00309Z"
        fill="url(#paint4_radial_1726_9113)"
      />
      <path
        d="M1.99689 8.00309C3.35264 8.00309 3.99379 8.77068 3.99379 9.99998C3.99379 11.2293 3.35264 11.9969 1.99689 11.9969C0.641147 11.9969 5.37345e-08 11.2293 0 9.99998C-5.37341e-08 8.77068 0.641146 8.00309 1.99689 8.00309Z"
        fill="white"
      />
      <path
        d="M1.99689 8.00309C3.35264 8.00309 3.99379 8.77068 3.99379 9.99998C3.99379 11.2293 3.35264 11.9969 1.99689 11.9969C0.641147 11.9969 5.37345e-08 11.2293 0 9.99998C-5.37341e-08 8.77068 0.641146 8.00309 1.99689 8.00309Z"
        fill="url(#paint5_radial_1726_9113)"
      />
      <path
        d="M18.0031 8.00309C19.3589 8.00309 20 8.77068 20 9.99998C20 11.2293 19.3589 11.9969 18.0031 11.9969C16.6474 11.9969 16.0062 11.2293 16.0062 9.99998C16.0062 8.77068 16.6474 8.00309 18.0031 8.00309Z"
        fill="url(#paint6_radial_1726_9113)"
      />
      <path
        d="M18.0031 8.00309C19.3589 8.00309 20 8.77068 20 9.99998C20 11.2293 19.3589 11.9969 18.0031 11.9969C16.6474 11.9969 16.0062 11.2293 16.0062 9.99998C16.0062 8.77068 16.6474 8.00309 18.0031 8.00309Z"
        fill="white"
      />
      <path
        d="M18.0031 8.00309C19.3589 8.00309 20 8.77068 20 9.99998C20 11.2293 19.3589 11.9969 18.0031 11.9969C16.6474 11.9969 16.0062 11.2293 16.0062 9.99998C16.0062 8.77068 16.6474 8.00309 18.0031 8.00309Z"
        fill="url(#paint7_radial_1726_9113)"
      />
      <path
        d="M5.75295 2.929C6.7116 3.88766 6.62219 4.88378 5.75295 5.75303C4.8837 6.62227 3.88758 6.71168 2.92892 5.75302C1.97026 4.79437 2.05967 3.79824 2.92892 2.92899C3.79816 2.05975 4.79429 1.97034 5.75295 2.929Z"
        fill="url(#paint8_radial_1726_9113)"
      />
      <path
        d="M5.75295 2.929C6.7116 3.88766 6.62219 4.88378 5.75295 5.75303C4.8837 6.62227 3.88758 6.71168 2.92892 5.75302C1.97026 4.79437 2.05967 3.79824 2.92892 2.92899C3.79816 2.05975 4.79429 1.97034 5.75295 2.929Z"
        fill="white"
      />
      <path
        d="M5.75295 2.929C6.7116 3.88766 6.62219 4.88378 5.75295 5.75303C4.8837 6.62227 3.88758 6.71168 2.92892 5.75302C1.97026 4.79437 2.05967 3.79824 2.92892 2.92899C3.79816 2.05975 4.79429 1.97034 5.75295 2.929Z"
        fill="url(#paint9_radial_1726_9113)"
      />
      <path
        d="M17.071 14.2471C18.0297 15.2058 17.9403 16.2019 17.0711 17.0711C16.2018 17.9404 15.2057 18.0298 14.247 17.0711C13.2884 16.1125 13.3778 15.1163 14.247 14.2471C15.1163 13.3779 16.1124 13.2884 17.071 14.2471Z"
        fill="url(#paint10_radial_1726_9113)"
      />
      <path
        d="M17.071 14.2471C18.0297 15.2058 17.9403 16.2019 17.0711 17.0711C16.2018 17.9404 15.2057 18.0298 14.247 17.0711C13.2884 16.1125 13.3778 15.1163 14.247 14.2471C15.1163 13.3779 16.1124 13.2884 17.071 14.2471Z"
        fill="white"
      />
      <path
        d="M17.071 14.2471C18.0297 15.2058 17.9403 16.2019 17.0711 17.0711C16.2018 17.9404 15.2057 18.0298 14.247 17.0711C13.2884 16.1125 13.3778 15.1163 14.247 14.2471C15.1163 13.3779 16.1124 13.2884 17.071 14.2471Z"
        fill="url(#paint11_radial_1726_9113)"
      />
      <path
        d="M2.92894 14.247C3.8876 13.2884 4.88373 13.3778 5.75297 14.247C6.62222 15.1163 6.71163 16.1124 5.75297 17.0711C4.79431 18.0297 3.79818 17.9403 2.92894 17.0711C2.05969 16.2018 1.97028 15.2057 2.92894 14.247Z"
        fill="url(#paint12_radial_1726_9113)"
      />
      <path
        d="M2.92894 14.247C3.8876 13.2884 4.88373 13.3778 5.75297 14.247C6.62222 15.1163 6.71163 16.1124 5.75297 17.0711C4.79431 18.0297 3.79818 17.9403 2.92894 17.0711C2.05969 16.2018 1.97028 15.2057 2.92894 14.247Z"
        fill="white"
      />
      <path
        d="M2.92894 14.247C3.8876 13.2884 4.88373 13.3778 5.75297 14.247C6.62222 15.1163 6.71163 16.1124 5.75297 17.0711C4.79431 18.0297 3.79818 17.9403 2.92894 17.0711C2.05969 16.2018 1.97028 15.2057 2.92894 14.247Z"
        fill="url(#paint13_radial_1726_9113)"
      />
      <path
        d="M14.247 2.92894C15.2057 1.97029 16.2018 2.0597 17.0711 2.92894C17.9403 3.79818 18.0297 4.79431 17.0711 5.75297C16.1124 6.71163 15.1163 6.62222 14.247 5.75297C13.3778 4.88373 13.2884 3.8876 14.247 2.92894Z"
        fill="url(#paint14_radial_1726_9113)"
      />
      <path
        d="M14.247 2.92894C15.2057 1.97029 16.2018 2.0597 17.0711 2.92894C17.9403 3.79818 18.0297 4.79431 17.0711 5.75297C16.1124 6.71163 15.1163 6.62222 14.247 5.75297C13.3778 4.88373 13.2884 3.8876 14.247 2.92894Z"
        fill="white"
      />
      <path
        d="M14.247 2.92894C15.2057 1.97029 16.2018 2.0597 17.0711 2.92894C17.9403 3.79818 18.0297 4.79431 17.0711 5.75297C16.1124 6.71163 15.1163 6.62222 14.247 5.75297C13.3778 4.88373 13.2884 3.8876 14.247 2.92894Z"
        fill="url(#paint15_radial_1726_9113)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint7_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint8_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint9_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint10_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint11_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint12_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint13_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint14_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 -0.0631747) rotate(90) scale(20.1264)"
        >
          <stop stopColor="#2E2E2E" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <radialGradient
          id="paint15_radial_1726_9113"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5442 -1.98276) rotate(112.241) scale(38.3921 54.8903)"
        >
          <stop offset="0.155205" stopColor="#8049F2" />
          <stop offset="1" stopColor="#6D4EAE" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
