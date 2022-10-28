export async function getGoodInfo(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    return json;
}

export async function getPagesLength(id) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=&fields=items(_id,_key,title,price),count`);
    const json = await response.json();
    return json;
}