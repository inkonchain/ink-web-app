"use client";
import { type ToastContentProps } from "react-toastify";
import { Bounce, toast, ToastOptions } from "react-toastify";
import { InkIcon } from "@inkonchain/ink-kit";

import { ExplorerIcon } from "@/components/icons/ExplorerIcon";
import { clientEnv } from "@/env-client";

interface VerifyToastData {
  title: string;
  description: string;
  txHash: string;
}

type VerifyToastProps = Partial<ToastContentProps> & {
  data: VerifyToastData;
};

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  transition: Bounce,
  closeButton: false,
};

const successToastOptions: ToastOptions = {
  ...toastOptions,
  className: "!p-0 !bg-transparent !shadow-none",
};

export const showSuccessToast = (
  title: string,
  description: string,
  txHash: string
) => {
  toast(VerifyToast, {
    ...successToastOptions,
    data: {
      title,
      description,
      txHash,
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, toastOptions);
};

export const VerifyToast = ({ closeToast, data }: VerifyToastProps) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-inkSuccess/8 rounded-2xl backdrop-blur-xl w-[min(90vw,700px)]">
      <div className="flex-shrink-0 size-8 rounded-full bg-inkSuccess flex items-center justify-center mt-1">
        <InkIcon.Check className="size-6 text-whiteMagic" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-lg font-semibold text-default/90">{data.title}</h3>
        <p className="text-sm text-default/70">{data.description}</p>
        {data.txHash && (
          <a
            href={`${clientEnv.NEXT_PUBLIC_VERIFY_EXPLORER_BASE_URL}/tx/${data.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-default underline transition-colors mt-1 inline-flex items-center gap-2"
          >
            <span className="text-default">View on Explorer</span>
            <ExplorerIcon size="icon-sm" />
          </a>
        )}
      </div>
      <button
        onClick={closeToast}
        className="flex-shrink-0 text-muted hover:text-default transition-colors hover:cursor-pointer"
      >
        <InkIcon.Close className="size-5" />
      </button>
    </div>
  );
};

VerifyToast.displayName = "VerifyToast";
