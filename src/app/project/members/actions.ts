'use server'
import { cookies } from 'next/headers'

export async function getMembers() {
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/users/all', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: (await cookies()).toString(),
    },
  })
}
