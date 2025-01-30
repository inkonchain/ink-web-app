"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  fetchUserByEmail,
  fetchUserEmailById,
} from "@/actions/fetch-user-data";

import { UnsubscribeForm } from "./_components/UnsubscribeForm";

export default function NewsletterUnsubscribePage() {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    async function fetchUserData() {
      const searchParamsId = searchParams.get("id");
      const searchParamsEmail = searchParams.get("email");

      if (searchParamsId) {
        const fetchedEmail = await fetchUserEmailById(searchParamsId);
        setEmail(fetchedEmail);
        setId(searchParamsId);
      }
      if (searchParamsEmail) {
        const decodedEmail = decodeURIComponent(searchParamsEmail);
        setEmail(decodedEmail);
        const user = await fetchUserByEmail(decodedEmail);
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
      <UnsubscribeForm userBrazeId={id} email={email} />
    </div>
  );
}
