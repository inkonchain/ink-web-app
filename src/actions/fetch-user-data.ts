"use server";

import {
  retrieveUserByEmail,
  retrieveUserEmailById,
} from "@/integrations/braze";

export async function fetchUserEmailById(id: string) {
  return retrieveUserEmailById(id);
}

export async function fetchUserByEmail(email: string) {
  return retrieveUserByEmail(email);
}
