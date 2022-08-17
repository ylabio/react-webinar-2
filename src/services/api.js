const api = '/api/v1/articles';

export async function getSingleItem(id) {
  const res = await fetch(
    `${api}/${id}?fields=*,maidIn(title,code),category(title)`
  );
  const data = await res.json();
  return data.result;
}

export async function getItems(limit, skip) {
  const res = await fetch(
    `${api}?limit=${limit}&skip=${skip}&fields=items(*),count`
  );
  const data = await res.json();
  return data.result;
}