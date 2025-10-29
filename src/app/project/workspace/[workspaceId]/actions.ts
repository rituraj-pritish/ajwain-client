export async function createTask(body: {
  workspaceId: number
  title: string
  description?: string
  date?: string
  memberIds?: string
}) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/tasks/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}

export async function updateTask(body: {
  id: number
  title: string
  description?: string
  date?: string
  memberIds?: string
}) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/tasks/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}

export async function getTask(body: { id: string }) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/tasks/details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}

export async function getUsers() {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/all', {
    method: 'GET',
    credentials: 'include',
  })
}
