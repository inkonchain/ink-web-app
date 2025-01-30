import { redirect } from "next/navigation";

import { routing } from "@/routing";

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
