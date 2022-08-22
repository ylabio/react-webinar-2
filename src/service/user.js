export async function getUserInfo(token) {
  const response = await fetch(`/api/v1/users/self`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
  });
  const data = response.json();

  if (!response.ok) {
    throw data;
  }
  
  return data;
}
