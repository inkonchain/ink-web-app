"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface NewsletterModalContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NewsletterModalContext = createContext<NewsletterModalContextProps>({
  isOpen: false,
  setIsOpen: () => {
    throw new Error(
      "Not yet implemented, make sure component is wrapped by NewsletterModalContextProvider."
    );
  },
});

export const useNewsletterModalContext = () =>
  useContext(NewsletterModalContext);

export const NewsletterModalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const context: NewsletterModalContextProps = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen]
  );

  return (
    <NewsletterModalContext.Provider value={context}>
      {children}
    </NewsletterModalContext.Provider>
  );
};
