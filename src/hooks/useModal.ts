import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useCallbackOnKey } from "@/hooks/useGlobalKey";
import { useScrollLock } from "@/hooks/useScrollLock";
import { usePathname, useRouter } from "@/routing";

interface UseModalProps {
  isOpen: boolean;
  closeModal: () => void;
  modalKey: string;
}

export function useModal({ isOpen, closeModal, modalKey }: UseModalProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useScrollLock({ key: modalKey, enabled: isOpen });

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      window.scrollTo(0, scrollY);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && window.location.hash !== "") {
      router.replace("#", { scroll: false });
    }
  }, [router, isOpen]);

  useEffect(() => {
    if (window.location.hash !== "") {
      closeModal();
    }
  }, [pathname, searchParams, closeModal]);

  useCallbackOnKey({
    key: "Escape",
    isDisabled: !isOpen,
    handler: () => {
      closeModal();
      return true;
    },
  });
}
