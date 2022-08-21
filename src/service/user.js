export async function getUserInfo(token) {
  try {
    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
}
