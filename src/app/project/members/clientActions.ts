import z from 'zod'
import { schema } from './components/create-member'

export async function createMember(body: z.infer<typeof schema>) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}
