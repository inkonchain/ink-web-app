"use client";
import React, { createContext, useContext, useState } from "react";

interface AppSubmissionModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AppSubmissionModalContext = createContext<AppSubmissionModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useAppSubmissionModalContext = () =>
  useContext(AppSubmissionModalContext);

export const AppSubmissionModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppSubmissionModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AppSubmissionModalContext.Provider>
  );
};
