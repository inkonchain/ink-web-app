"use server";

import { cookies } from "next/headers";

export const setTheme = async (theme: string) => {
  const cookieStore = await cookies();
  cookieStore.set("__theme__", theme);
};
