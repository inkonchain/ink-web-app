"use client";
import React, { createContext, useContext, useState } from "react";

interface VerificationModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const VerificationModalContext = createContext<VerificationModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useVerificationModalContext = () =>
  useContext(VerificationModalContext);

export const VerificationModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <VerificationModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </VerificationModalContext.Provider>
  );
};
