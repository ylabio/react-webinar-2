const api = '/api/v1/articles';

export async function getInfoById(id) {
  const response = await fetch(
    `${api}/${id}?fields=*,maidIn(title,code),category(title)`
  );
  const data = await response.json();
  return data.result;
}

export async function getItems(limit, skip) {
  const response = await fetch(
    `${api}?limit=${limit}&skip=${skip}&fields=items(*),count`
  );
  const data = await response.json();
  return data.result;
}
