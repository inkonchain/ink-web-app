import { PropsWithChildren } from "react";

export const TableRowPill: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-full p-3 py-2 transition-colors duration-200 text-sm font-bold whitespace-nowrap text-[#160F1F80] bg-[#7132F50F] dark:bg-[#FFFFFF0F] dark:text-[#FFFFFF80]">
      {children}
    </div>
  );
};

TableRowPill.displayName = "TableRowPill";
