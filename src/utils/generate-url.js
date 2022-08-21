export function generateUrl(base, params) {
  let url = base + '?';
  for (let param of params) {
    url += `${param.key}=${param.value}&`;
  }
  return url;
}
