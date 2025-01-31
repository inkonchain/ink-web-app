import React from "react";
import Image from "next/image";

import { EXTERNAL_LINKS_WITH_PARAMS, Link } from "@/routing";

interface BlockExplorerButtonProps {
  transactionHash: string;
}

export const BlockExplorerButton: React.FC<BlockExplorerButtonProps> = ({
  transactionHash,
}) => {
  return (
    <Link
      href={EXTERNAL_LINKS_WITH_PARAMS.l1Explorer(transactionHash)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 pr-4 bg-[#DDDCF0BF] hover:bg-[#c4c3dcbf] rounded-full transition-all duration-300 dark:bg-white/[0.06] dark:backdrop-blur-[32px]"
    >
      <Image
        src="/icons/ExplorerIcon.svg"
        width={23}
        height={23}
        alt="Explorer"
        className="inline dark:hidden"
      />
      <Image
        src="/icons/ExplorerIconDark.svg"
        width={23}
        height={23}
        alt="Explorer"
        className="hidden dark:inline"
      />
      <div className="flex items-center gap-1">
        <span className="font-bold text-sm">View Transaction</span>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="pt-0.5"
        >
          <path d="M9.57812 2.97192C9.57812 2.78442 9.64062 2.62817 9.76562 2.50317C9.90104 2.36776 10.0625 2.30005 10.25 2.30005H13.6562C13.8438 2.30005 14 2.36776 14.125 2.50317C14.2604 2.62817 14.3281 2.78442 14.3281 2.97192V6.37817C14.3281 6.56567 14.2604 6.72713 14.125 6.86255C14 6.98755 13.8438 7.05005 13.6562 7.05005C13.4688 7.05005 13.3073 6.98755 13.1719 6.86255C13.0469 6.72713 12.9844 6.56567 12.9844 6.37817V4.5813L8.4375 9.12817C8.3125 9.25317 8.15625 9.31567 7.96875 9.31567C7.79167 9.31567 7.63542 9.25317 7.5 9.12817C7.375 8.99276 7.3125 8.83651 7.3125 8.65942C7.3125 8.47192 7.375 8.31047 7.5 8.17505L12.0469 3.62817H10.25C10.0625 3.62817 9.90104 3.56567 9.76562 3.44067C9.64062 3.30526 9.57812 3.14901 9.57812 2.97192ZM2 4.48755C2 3.88338 2.21354 3.36776 2.64062 2.94067C3.06771 2.51359 3.58333 2.30005 4.1875 2.30005H6.07812C6.26562 2.30005 6.42188 2.36776 6.54688 2.50317C6.68229 2.62817 6.75 2.78442 6.75 2.97192C6.75 3.14901 6.68229 3.30526 6.54688 3.44067C6.42188 3.56567 6.26562 3.62817 6.07812 3.62817H4.1875C3.94792 3.62817 3.74479 3.71151 3.57812 3.87817C3.41146 4.04484 3.32812 4.24797 3.32812 4.48755V12.4407C3.32812 12.6803 3.41146 12.8834 3.57812 13.05C3.74479 13.2063 3.94792 13.2844 4.1875 13.2844H12.1406C12.3802 13.2844 12.5781 13.2063 12.7344 13.05C12.901 12.8834 12.9844 12.6803 12.9844 12.4407V10.55C12.9844 10.3625 13.0469 10.2063 13.1719 10.0813C13.3073 9.94588 13.4688 9.87817 13.6562 9.87817C13.8438 9.87817 14 9.94588 14.125 10.0813C14.2604 10.2063 14.3281 10.3625 14.3281 10.55V12.4407C14.3281 13.0448 14.1146 13.5605 13.6875 13.9875C13.2604 14.4146 12.7448 14.6282 12.1406 14.6282H4.1875C3.58333 14.6282 3.06771 14.4146 2.64062 13.9875C2.21354 13.5605 2 13.0448 2 12.4407V4.48755Z" />
        </svg>
      </div>
    </Link>
  );
};
