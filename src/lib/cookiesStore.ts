"use server";

import { cookies } from "next/headers";

export const setCookies = async (token: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set("token", token);
};

export const removeCookiesToken = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("token");
};

export const getCookies = async (key: string) => {
  const cookiesStore = await cookies();
  return cookiesStore.get(key || "token")?.value || "";
};
