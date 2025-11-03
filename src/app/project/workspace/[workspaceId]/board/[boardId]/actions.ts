'use server'
import { cookies } from 'next/headers'

export async function getBoard(id: string) {
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/boards/details/' + id, {
    method: 'GET',
    headers: {
      Cookie: (await cookies()).toString(),
    },
    credentials: 'include',
  })
}
