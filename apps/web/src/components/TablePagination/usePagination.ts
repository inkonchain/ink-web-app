import { useMemo, useState } from "react";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";

interface UsePaginationProps<T> {
  items: T[];
  perPage: number;
  /** First page is 0. */
  initialPage?: number;
}

function getCurrentlyDisplayed<T>(page: number, perPage: number, items: T[]) {
  return items.slice(page * perPage, (page + 1) * perPage);
}

export function usePagination<T>({
  items,
  perPage,
  initialPage = 0,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(items.length / perPage);

  const currentItems = useMemo(() => {
    return getCurrentlyDisplayed(currentPage, perPage, items);
  }, [currentPage, perPage, items]);

  const isOnFirstPage = currentPage === 0;
  const isOnLastPage = currentPage === totalPages - 1;
  const previousPage = () => setCurrentPage(Math.max(currentPage - 1, 0));
  const nextPage = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages - 1));

  useCallbackOnKey({
    isDisabled: isOnFirstPage,
    key: "ArrowLeft",
    handler: () => {
      previousPage();
      return true;
    },
  });
  useCallbackOnKey({
    isDisabled: isOnLastPage,
    key: "ArrowRight",
    handler: () => {
      nextPage();
      return true;
    },
  });

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
  };
}
