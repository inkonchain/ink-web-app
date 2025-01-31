"use server";

import { cookies } from "next/headers";

import { COOKIE_CONSENT } from "@/integrations/consent";

export const onAcceptCookiePolicy = async () => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_CONSENT, "true");
};

export const onRefuseCookiePolicy = async () => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_CONSENT, "false");
};
