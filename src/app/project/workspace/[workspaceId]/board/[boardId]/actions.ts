'use server'
import { cookies } from 'next/headers'

export async function getBoard(id: string) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/boards/details/' + id, {
    method: 'GET',
    headers: {
      Cookie: (await cookies()).toString(),
    },
    credentials: 'include',
  })
}
