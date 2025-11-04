import z from 'zod'
import { schema } from './sign-in-form'

export async function signIn(body: z.infer<typeof schema>) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/users/signin',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )

    if (response.status !== 201) throw response
  } catch (error) {
    throw error
  }
}
