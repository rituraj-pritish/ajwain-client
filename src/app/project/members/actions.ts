'use server'
import { cookies } from 'next/headers'

export async function getMembers() {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/users/all', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: (await cookies()).toString(),
    },
  })
}
