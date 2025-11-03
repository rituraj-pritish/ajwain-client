'use server'
import { cookies } from 'next/headers'

export async function getProjectDetails() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/projects/details',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: (await cookies()).toString(),
        },
      },
    )
    return response
  } catch (error) {
    throw error
  }
}

export async function getUserDetails() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/users/details',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: (await cookies()).toString(),
        },
      },
    )
    return response
  } catch (error) {
    throw error
  }
}

export async function getWorkspace(body: { id: number }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/workspaces/details',
      {
        method: 'POST',
        headers: {
          Cookie: (await cookies()).toString(),
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      },
    )

    return response
  } catch (error) {
    throw error
  }
}
