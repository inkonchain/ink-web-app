"use client";

import { useState } from "react";
import Confetti from "react-confetti";

import { FaucetButton } from "@/components/FaucetButton";

export const HeaderFaucetButton: React.FC = () => {
  const [requestSuccess, setRequestSuccess] = useState<boolean | null>(null);

  return (
    <>
      <FaucetButton onChange={setRequestSuccess} />
      {requestSuccess && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          gravity={0.5}
          recycle={false}
        />
      )}
    </>
  );
};
