import { redirect } from "next/navigation";

export default function BridgePage() {
  redirect("/dashboard?category=bridge");
}
