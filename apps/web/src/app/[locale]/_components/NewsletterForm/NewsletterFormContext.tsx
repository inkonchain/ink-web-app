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

interface NewsletterFormContextProps {
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

const NewsletterFormContext = createContext<NewsletterFormContextProps>({
  isFormOpen: false,
  setIsFormOpen: () => {
    throw new Error(
      "Not yet implemented, make sure component is wrapped by NewsletterFormContextProvider."
    );
  },
});

export const useNewsletterFormContext = () => useContext(NewsletterFormContext);

export const NewsletterFormContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const context: NewsletterFormContextProps = useMemo(
    () => ({ isFormOpen, setIsFormOpen }),
    [isFormOpen, setIsFormOpen]
  );

  return (
    <NewsletterFormContext.Provider value={context}>
      {children}
    </NewsletterFormContext.Provider>
  );
};
