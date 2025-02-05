"use client";

import { FooterContent } from "@/components/Footer/FooterContent";
import { NoisyContainer } from "@/components/Noisy";
import { containerClasses } from "@/components/styles/container";
import { classNames } from "@/util/classes";

export const Footer = () => {
  return (
    <footer className={classNames(containerClasses())}>
      <div className="px-4 lg:px-0">
        <NoisyContainer
          className={classNames(
            "px-8 py-8 backdrop-blur-3xl bg-whiteMagic/25 dark:bg-transparent box-shadow"
          )}
          rounded="3xl"
        >
          <FooterContent />
        </NoisyContainer>
      </div>
    </footer>
  );
};
