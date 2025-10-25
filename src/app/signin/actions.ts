export async function signIn (body) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }) 

    if(response.status !== 201) throw response;
  } catch (error) {
    throw error;
  }
}