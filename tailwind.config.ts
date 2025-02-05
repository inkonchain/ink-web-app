import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "10": "2.5rem",
        "12": "3rem",
        "15": "3.75rem",
        "18": "4.5rem",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        pulse: "slight-pulse 3s ease-in-out infinite",
        slightPulse: "slight-pulse 5.5s ease-in-out infinite",
      },
      blur: {
        xs: "2px",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        spotlight: "90px",
        events: "60px",
        card: "40px",
        "card-content": "32px",
        "events-content": "36px",
        "spotlight-content": "66px",
        "spotlight-mobile": "44px",
        "spotlight-mobile-content": "32px",
        "4xl": "30px",
        "app-card": "48px",
      },
      fontSize: {
        /** These names match what is defined in the Typography section of the Figma designs */
        h1: ["64px", { lineHeight: "60.8px", letterSpacing: "-2%" }],
        h2: ["38px", { lineHeight: "38px", letterSpacing: "-1%" }],
        h3: ["32px", { lineHeight: "32px", letterSpacing: "-1%" }],
        body: ["16px", "22px"],
        "body-2": ["16px", "20px"],
        "body-3": ["14px", "18px"],
        linkLg: ["38px", { lineHeight: "38px", letterSpacing: "-1%" }],
        linkSm: ["18px", "23.4px"],
        footer: ["11px", { lineHeight: "20px", letterSpacing: "5%" }],
        header: [
          "16px",
          {
            lineHeight: "20.8px",
            fontWeight: 500,
          },
        ],
        "4xl": ["36px", { lineHeight: "47px", letterSpacing: "-2%" }],
        "6xl": ["60px", { lineHeight: "72px", letterSpacing: "-2%" }],
        "very-large": ["110px", { lineHeight: "110px", letterSpacing: "-2%" }],
        label: ["16px", { lineHeight: "16px", letterSpacing: "-2%" }],
        "rotating-pill": ["20px", { lineHeight: "20px", letterSpacing: "-1%" }],
        caption: ["12px", { lineHeight: "16px", letterSpacing: "-2%" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slightPulse: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      transitionDuration: {
        150: "150ms",
        600: "600ms",
      },
      transitionTimingFunction: {
        // Generated using: https://linear-easing-generator.netlify.app/
        spring: `linear(
    0, 0.002, 0.007 1.1%, 0.027, 0.06, 0.108 5.1%, 0.214 7.7%, 0.58 15.8%, 0.686,
    0.774, 0.847, 0.907, 0.955, 0.991 32.1%, 1.011 34.6%, 1.026 37.3%,
    1.034 40.2%, 1.037 43.5%, 1.034 48.2%, 1.012 62.1%, 1.003 71%,
    0.999 81.9% 100%
  )`,
      },
      boxShadow: {
        "inner-form": "inset 0 0px 4px 0 var(--tw-shadow-color)",
        "large-pop": "0px 3px 84px -10px var(--tw-shadow-color)",
        "box-shadow": "0px 3px 34px -10px rgba(180, 180, 180, 0.40)",
        "blue-glow": "0px 3px 84px -10px rgba(63,107,175,0.50)",
      },
      colors: {
        default: "#160F1F",
        blackMagic: "#0B0D12",
        whiteMagic: "#F6F4FF",
        purpleMagic: "#7132F5",
        redMagic: {
          100: "#FF7386",
          400: "#D11D45",
          500: "#F5395E",
        },
        krakenPurple: "#7538F5",
        secondaryPurple: "#7132F5",
        eventPurple: "#B7AAEE",
        gradientPurple: "#8049F2",
        softGradientPurple: "#6D4EAE",
        softDarkPurple: "#160F1F",
        featuredCardPurple: "#6451AA26",
        glossyPill: "#160F1F33",
        lightPurple: "#B9AAEF",
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
      backgroundSize: {
        "overflow-150": "150% 100%",
        "overflow-200": "200% 100%",
      },
      flex: {
        "2": "2 auto",
      },
      screens: {
        /** This size should be used to adapt things depending on whether the full menu size should be "collapsed". */
        menu: "1035px",
        "sm-landscape-only": {
          raw: "(max-height: 700px) and (min-width: 640px)",
        },
        hd: "1920px",
        "2xl": "1600px",
      },
      rotate: {
        // For the arrow icon to point to the top-right.
        225: "225deg",
      },
    },
  },
};

export default config;
