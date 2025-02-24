import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inner-form": "inset 0 0px 4px 0 var(--tw-shadow-color)",
        "large-pop": "0px 3px 84px -10px var(--tw-shadow-color)",
        "box-shadow": "0px 3px 34px -10px rgba(180, 180, 180, 0.40)",
        "blue-glow": "0px 3px 84px -10px rgba(63,107,175,0.50)",
      },
      colors: {
        krakenPurple: "#7538F5",
        gradientPurple: "#8049F2",
        softDarkPurple: "#160F1F",
        featuredCardPurple: "#6451AA26",
        darkPurple: "#5C479D",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "purple-pill-gradient":
          "radial-gradient(367.31% 2457.04% at 354.39% 128.21%, #8049F2 0%, rgba(109, 78, 174, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7))",
        "dapps-icon-gradient": `linear-gradient(144.22deg, #C7E1FF -40.26%, #C6C7D2 66.08%, #7132F5 125.73%),
radial-gradient(61.23% 153.65% at -4.6% -9.33%, #C7E1FF 0%, rgba(199, 225, 255, 0.6) 33.33%, #F6F4FF 66.67%, rgba(198, 199, 210, 0) 100%),
linear-gradient(0deg, rgba(130, 215, 251, 0), rgba(130, 215, 251, 0)),
radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%)`,
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        noise: "url(/noise.svg);",
        "event-pill-gradient":
          "radial-gradient(150% 740.74% at 135.63% 100%, #B9AAEF 0%, rgba(157, 130, 254, 0) 100%), linear-gradient(0deg, var(--fill-bg-100, #FFFFFF), var(--fill-bg-100, #FFFFFF))",
        "event-pill-gradient-dark":
          "radial-gradient(100.63% 100.63% at 50% -0.32%, #2E2E2E 0%, #080808 100%), radial-gradient(367.31% 2457.04% at 354.39% 128.21%, #8049F2 0%, rgba(109, 78, 174, 0) 100%)",
        "featured-card-gradient":
          "radial-gradient(115.71% 442.14% at 97.72% -9.91%, #8049F2 15.52%, rgba(109, 78, 174, 0) 100%),radial-gradient(100.63% 101.63% at 50% -0.32%, #2E2E2E 0%, #080808 100%),linear-gradient(0deg, #FFFFFF, #FFFFFF)",
        "featured-card-gradient-dark":
          "radial-gradient(115.71% 442.14% at 97.72% -9.91%, #8049F2 15.52%, rgba(109, 78, 174, 0) 100%),linear-gradient(0deg, #FFFFFF, #FFFFFF),radial-gradient(100.63% 101.63% at 50% -0.32%, #2E2E2E 0%, #080808 100%)",
      },
      flex: {
        "2": "2 auto",
      },
    },
  },
};

export default config;
