import React from "react";

export interface GlobalSvgStuffProps {}

/** Stuff in this component are for thing that have an unique ID on the page (<defs> IDs should be unique) */
export const GlobalSvgStuff: React.FC<GlobalSvgStuffProps> = ({}) => {
  return (
    <svg
      className="opacity-0 h-0 w-0"
      viewBox="0 0 833 275"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="animated-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7538F5">
            <animate
              attributeName="stop-color"
              values="#7538F5; #7538F5; #7538F5;"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#aaaaaa">
            <animate
              attributeName="stop-color"
              values="#7538F5; #aaaaaa; #7538F5;"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
