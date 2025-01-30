"use server";

import { BASE_URL } from "@/lib/utils";
import { SignInSchema } from "./login-schema";
import { cookies } from "next/headers";

export type SignInActionState = {
  email?: string;
  password?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function signIn(
  _prevState: SignInActionState,
  form: FormData
): Promise<SignInActionState> {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const cookiesStore = await cookies();

  const validatedFields = SignInSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      email,
      password,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      cookiesStore.set({
        name: "token",
        value: data.token,
        //   maxAge: 60 * 60 * 24 * 7, // 1 week
        // 1 minute
        maxAge: 60,
        secure: process.env.NODE_ENV === "production",
      });
      return {
        email,
        password,
      };
    }
  } catch (error) {
    return {
      email,
      password,
    };
  }

  // process validated form inputs here

  return { email, password };
}
