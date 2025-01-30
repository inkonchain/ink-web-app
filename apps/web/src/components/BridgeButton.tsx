"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { NEXT_PUBLIC_GELATO_BRIDGE_URL } from "@/env-client";

export const BridgeButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(NEXT_PUBLIC_GELATO_BRIDGE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500
 to-pink-500
                  text-white font-extrabold py-4 px-8 rounded-full shadow-lg text-2xl
 cursor-pointer"
      animate={{
        boxShadow: isHovered
          ? [
              "0 0 0 0 rgba(0, 0, 255, 0)",
              "0 0 0 20px rgba(0, 0, 255, 0.1)",
              "0 0 0 40px rgba(0, 0, 255, 0)",
            ]
          : "0 0 0 0 rgba(0, 0, 255, 0)",
      }}
      transition={{
        duration: 1,
        repeat: isHovered ? Infinity : 0,
        repeatType: "loop",
      }}
    >
      <span className="relative z-10">🌉 Bridge to Testnet Now! 🌉</span>
      <motion.div
        className="absolute inset-0 bg-white opacity-20"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-6
                    opacity-75 blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.75 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: [0, 0.5, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
    </motion.button>
  );
};
