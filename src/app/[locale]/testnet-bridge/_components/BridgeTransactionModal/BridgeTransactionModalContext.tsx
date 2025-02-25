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
  txHash: null | string;
  setTxHash: Dispatch<SetStateAction<null | string>>;
}

const BridgeTransactionModalContext =
  createContext<BridgeTransactionModalContextProps>({
    txHash: null,
    setTxHash: () => {},
  });

export const useBridgeTransactionModal = () =>
  useContext(BridgeTransactionModalContext);

export const BridgeTransactionModalContextProvider: React.FC<
  PropsWithChildren
> = ({ children }) => {
  const [txHash, setTxHash] = useState<null | string>(null);

  const context: BridgeTransactionModalContextProps = useMemo(
    () => ({ txHash, setTxHash }),
    [txHash, setTxHash]
  );

  return (
    <BridgeTransactionModalContext.Provider value={context}>
      {children}
    </BridgeTransactionModalContext.Provider>
  );
};
