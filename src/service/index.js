const api = '/api/v1/articles';

export async function getInfoById(id) {
  const response = await fetch(
    `${api}/${id}?fields=*,maidIn(title,code),category(title)`
  );
  const data = await response.json();
  return data.result;
}
