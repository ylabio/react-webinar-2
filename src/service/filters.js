export async function getSelectOptions() {
  try {
    const response = await fetch(`/api/v1/categories?limit=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
