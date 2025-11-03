import { TaskStatus } from '@/types/task.interface'

export async function createTask(body: {
  boardId: number
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
  date?: string | null
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

export async function updateTaskStatus(body: {
  id: number
  status: TaskStatus
}) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/tasks/status/update', {
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

export async function deleteTask(body: { id: number }) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/tasks/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}
