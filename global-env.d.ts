import en from "./messages/en-US.json";
/// <reference types="react-scripts" />

interface Window {
  ethereum: any;
}

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
