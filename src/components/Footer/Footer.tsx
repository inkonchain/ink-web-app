"use client";

import { FooterContent } from "@/components/Footer/FooterContent";
import { classNames } from "@/util/classes";

export const Footer = () => {
  return (
    <footer>
      <div
        className={classNames(
          "px-8 py-8 backdrop-blur-3xl ink:bg-background-container rounded-xl box-shadow"
        )}
      >
        <FooterContent />
      </div>
    </footer>
  );
};
