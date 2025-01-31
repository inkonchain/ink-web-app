import { PropsWithChildren, useEffect, useState } from "react";

export interface TemporaryMessageProps {
  timeout: number;
}

export const TemporaryMessage: React.FC<
  PropsWithChildren<TemporaryMessageProps>
> = ({ timeout, children }) => {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    setIsShown(true);
    const timeoutRef = setTimeout(() => {
      setIsShown(false);
    }, timeout);
    return () => clearTimeout(timeoutRef);
  }, [timeout]);

  return isShown && children;
};
