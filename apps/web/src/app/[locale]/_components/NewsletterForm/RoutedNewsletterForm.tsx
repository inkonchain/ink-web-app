"use client";

import { useEffect } from "react";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { usePrevious } from "@/hooks/usePrevious";
import { usePathname, useRouter } from "@/routing";

import { NewsletterForm } from "./NewsletterForm";
import { useNewsletterFormContext } from "./NewsletterFormContext";

export interface RoutedNewsletterFormProps {
  copy: {
    ctaLabel: string;
  };
}

export const RoutedNewsletterForm: React.FC<RoutedNewsletterFormProps> = ({
  copy,
}) => {
  const { isFormOpen, setIsFormOpen } = useNewsletterFormContext();
  const router = useRouter();

  const pathname = usePathname();
  const lastPathName = usePrevious(pathname);

  useEffect(() => {
    if (pathname !== lastPathName) {
      setIsFormOpen(false);
    }
  }, [pathname, lastPathName, setIsFormOpen]);

  useCallbackOnKey({
    key: "s",
    handler: () => {
      if (pathname !== "/") {
        router.push("/");
        // When the route changes, sometimes the state gets reset for some reason.
        // `isFormOpen` stays "false", but the `AnimatePresence` still plays, which leaves us into a weird state.
        // This workarounds seems to fix it consistently by delaying the state update.
        setTimeout(() => setIsFormOpen(true), 500);
      } else {
        setIsFormOpen(true);
      }
      return true;
    },
  });
  useCallbackOnKey({
    key: "Escape",
    isDisabled: !isFormOpen,
    handler: () => {
      setIsFormOpen(false);
      return true;
    },
  });

  return (
    <NewsletterForm
      copy={copy}
      isOpen={isFormOpen}
      setIsOpen={setIsFormOpen}
      hasShortcut
    />
  );
};
