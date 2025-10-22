'use server'

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
  (await cookies()).set(name, value, { httpOnly: true, secure: true});
}

export async function removeCookie(name: string) {
  (await cookies()).delete(name)
}
