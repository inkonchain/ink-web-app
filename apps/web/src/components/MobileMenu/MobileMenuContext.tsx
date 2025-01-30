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

interface MobileMenuContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileMenuContext = createContext<MobileMenuContextProps>({
  isOpen: false,
  setIsOpen: () => {
    throw new Error(
      "Not yet implemented, make sure component is wrapped by MobileMenuContextProvider."
    );
  },
});

export const useMobileMenuContext = () => useContext(MobileMenuContext);

export const MobileMenuContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const context: MobileMenuContextProps = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen]
  );

  return (
    <MobileMenuContext.Provider value={context}>
      {children}
    </MobileMenuContext.Provider>
  );
};
