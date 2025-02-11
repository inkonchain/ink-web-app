"use client";
import { Button } from "@inkonchain/ink-kit";

import { useAppSubmissionModalContext } from "@/components/AppSubmissionModal/AppSubmissionModalContext";

export function AddYourAppButton() {
  const { setIsOpen } = useAppSubmissionModalContext();

  return (
    <Button
      className="whitespace-nowrap"
      variant="primary"
      size="md"
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}
    >
      <span className="hidden lg:block">Add your app</span>
      <span className="block lg:hidden">Add</span>
    </Button>
  );
}
