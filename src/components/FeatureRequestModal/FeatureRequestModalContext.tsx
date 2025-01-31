"use client";
import React, { createContext, useContext, useState } from "react";

interface FeatureRequestModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FeatureRequestModalContext =
  createContext<FeatureRequestModalContextType>({
    isOpen: false,
    setIsOpen: () => {},
  });

export const useFeatureRequestModalContext = () =>
  useContext(FeatureRequestModalContext);

export const FeatureRequestModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FeatureRequestModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </FeatureRequestModalContext.Provider>
  );
};
