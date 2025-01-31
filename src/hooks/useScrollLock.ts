import { useEffect } from "react";

let locks: string[] = [];

const pageScroll = {
  lock: (id: string) => {
    document.body.style.overflow = "hidden";
    if (!locks.includes(id)) {
      locks.push(id);
    }
  },
  unlock: (id: string) => {
    locks = locks.filter((lock) => lock !== id);
    if (locks.length === 0) {
      document.body.style.overflow = "";
    }
  },
};

export const useScrollLock = ({
  key,
  enabled,
}: {
  key: string;
  enabled: boolean;
}) => {
  useEffect(() => {
    if (enabled) {
      pageScroll.lock(key);
    }
    return () => pageScroll.unlock(key);
  }, [key, enabled]);
};
