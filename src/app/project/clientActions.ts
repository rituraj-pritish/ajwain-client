export async function logout() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/users/logout',
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
      process.env.NEXT_PUBLIC_API_BASE_URL + '/workspaces/create',
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

export async function updateWorkspace(body: { id: number; name: string }) {
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/workspaces/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}

export async function deleteWorkspace(body: { id: number }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/workspaces/delete',
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

export async function createBoard(body: { name: string; workspaceId: number }) {
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/boards/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}

export async function updateBoard(body: { id: number; name: string }) {
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/boards/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}

export async function deleteBoard(id: number) {
  return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/boards/delete/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
}
