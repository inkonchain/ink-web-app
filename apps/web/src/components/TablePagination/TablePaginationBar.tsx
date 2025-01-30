import { classNames } from "@/util/classes";

import { ChevronLeftIcon } from "../icons/ChevronLeft";
import { ChevronRightIcon } from "../icons/ChevronRight";
import { DoubleChevronLeftIcon } from "../icons/DoubleChevronLeft";
import { DoubleChevronRightIcon } from "../icons/DoubleChevronRight";

interface TablePaginationBarProps {
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const TablePaginationBar: React.FC<TablePaginationBarProps> = ({
  currentPage,
  totalItems,
  perPage,
  onPageChange,
  className,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  const lastPage = totalPages - 1;
  const buttonClassName =
    "size-6 rounded-md text-blackMagic/75 dark:text-whiteMagic/75 hover:bg-blackMagic/10 dark:hover:bg-whiteMagic/10 disabled:opacity-50 disabled:cursor-not-allowed text-body-2 font-bold flex items-center justify-center justify-center";

  if (totalItems === 0) return null;

  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-2",
        className
      )}
    >
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className={buttonClassName}
      >
        <DoubleChevronLeftIcon size="icon-lg" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={buttonClassName}
      >
        <ChevronLeftIcon size="icon-lg" />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={classNames(buttonClassName, {
              "bg-blackMagic/20 dark:bg-whiteMagic/20": page === currentPage,
            })}
          >
            {page + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={buttonClassName}
      >
        <ChevronRightIcon size="icon-lg" />
      </button>

      <button
        onClick={() => onPageChange(lastPage)}
        disabled={currentPage === lastPage}
        className={buttonClassName}
      >
        <DoubleChevronRightIcon size="icon-lg" />
      </button>
    </div>
  );
};
