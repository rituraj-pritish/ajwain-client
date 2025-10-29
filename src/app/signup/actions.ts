import z from 'zod'
import { schema } from './sign-up-form'

export async function signUp(body: z.infer<typeof schema>) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/projects/create', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}
