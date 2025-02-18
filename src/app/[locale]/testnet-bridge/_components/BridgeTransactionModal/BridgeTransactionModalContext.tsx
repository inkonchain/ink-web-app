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

interface BridgeTransactionModalContextProps {
  isOpen: boolean;
  txHash: null | string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTxHash: Dispatch<SetStateAction<null | string>>;
}

function notImplementedYet() {
  throw new Error(
    "Not yet implemented, make sure component is wrapped by BridgeTransactionModalContextProvider."
  );
}

const BridgeTransactionModalContext =
  createContext<BridgeTransactionModalContextProps>({
    isOpen: false,
    txHash: null,
    setIsOpen: notImplementedYet,
    setTxHash: notImplementedYet,
  });

export const useBridgeTransactionModal = () =>
  useContext(BridgeTransactionModalContext);

export const BridgeTransactionModalContextProvider: React.FC<
  PropsWithChildren
> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<null | string>(null);

  const context: BridgeTransactionModalContextProps = useMemo(
    () => ({ isOpen, setIsOpen, txHash, setTxHash }),
    [isOpen, setIsOpen, txHash, setTxHash]
  );

  return (
    <BridgeTransactionModalContext.Provider value={context}>
      {children}
    </BridgeTransactionModalContext.Provider>
  );
};
