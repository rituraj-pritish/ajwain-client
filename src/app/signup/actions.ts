export async function signUp (body) {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/projects/create', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}