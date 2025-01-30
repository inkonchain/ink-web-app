"use client";

import { useUsername } from "../context/UsernameContext";

export default function UsernameInput() {
  const { username, setUsername } = useUsername();

  return (
    <input
      type="text"
      placeholder="Your username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg w-full"
    />
  );
}
