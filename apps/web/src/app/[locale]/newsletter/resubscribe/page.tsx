"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  retrieveUserByEmail,
  retrieveUserEmailById,
} from "@/integrations/braze";

import { ResubscribeForm } from "./_components/ResubscribeForm";

export default function NewsletterResubscribePage() {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    async function fetchUserData() {
      const searchParamsId = searchParams.get("id");
      const searchParamsEmail = searchParams.get("email");

      if (searchParamsId) {
        const fetchedEmail = await retrieveUserEmailById(searchParamsId);
        setEmail(fetchedEmail);
        setId(searchParamsId);
      }
      if (searchParamsEmail) {
        setEmail(searchParamsEmail);
        const user = await retrieveUserByEmail(searchParamsEmail);
        setId(user?.external_id);
      }
    }

    fetchUserData();
  }, [searchParams]);

  if (!id || !email) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full h-screen px-4 flex flex-col items-center justify-center">
      <ResubscribeForm userBrazeId={id} email={email} />
    </div>
  );
}
