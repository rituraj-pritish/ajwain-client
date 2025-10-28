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
