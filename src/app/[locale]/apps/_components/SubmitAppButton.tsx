"use client";
import { Button, InkIcon } from "@inkonchain/ink-kit";

import { useAppSubmissionModalContext } from "@/components/AppSubmissionModal/AppSubmissionModalContext";
import { classNames } from "@/util/classes";

import "./SubmitAppButton.css";

export function SubmitAppButton() {
  const { setIsOpen } = useAppSubmissionModalContext();

  return (
    <Button
      className={classNames("gradient-border ink:text-text-default")}
      variant="secondary"
      size="md"
      iconLeft={<InkIcon.Plus className="ink:size-3" />}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}
    >
      Submit app
    </Button>
  );
}
