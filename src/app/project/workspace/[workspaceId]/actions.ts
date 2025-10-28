export async function createTask(body) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/tasks/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}
