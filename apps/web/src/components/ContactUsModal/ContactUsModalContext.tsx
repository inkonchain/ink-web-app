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

interface ContactUsModalContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ContactUsModalContext = createContext<ContactUsModalContextProps>({
  isOpen: false,
  setIsOpen: () => {
    throw new Error(
      "Not yet implemented, make sure component is wrapped by ContactUsModalContextProvider."
    );
  },
});

export const useContactUsModalContext = () => useContext(ContactUsModalContext);

export const ContactUsModalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const context: ContactUsModalContextProps = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen]
  );

  return (
    <ContactUsModalContext.Provider value={context}>
      {children}
    </ContactUsModalContext.Provider>
  );
};
