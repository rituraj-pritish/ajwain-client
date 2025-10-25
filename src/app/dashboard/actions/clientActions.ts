export async function logout() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/logout', {
      method: 'GET',
      credentials: 'include',
    }) 

    if(!response.status.toString().startsWith('2')) throw response;
  } catch (error) {
    throw error;
  }
}