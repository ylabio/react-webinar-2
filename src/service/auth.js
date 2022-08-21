export async function getToken(data) {
  try {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

export async function deleteToken(token) {
  try {
    await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });

  } catch (error) {
    return error;
  }
}
