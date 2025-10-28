export async function logout() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/users/logout',
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    if (!response.status.toString().startsWith('2')) throw response
  } catch (error) {
    throw error
  }
}

export async function createWorkspace(body: { name: string }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/workspaces/create',
      {
        method: 'POST',
        headers: {
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

export async function deleteWorkspace(body: { id: number }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/workspaces/delete',
      {
        method: 'DELETE',
        headers: {
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
