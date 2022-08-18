const host = '';
const prefix = 'api/v1';

export default {
  main: () => [host, '/'].join(''),
  initialLoad: () => [host, prefix, 'articles', '?limit=0&skip=0'].join('/'),
  pagination: (limit, skip) => [host, prefix, `articles?limit=${limit}&skip=${skip}`].join('/'),
  itemPage: (id) => [host, 'articles', id].join('/'),
  itemDepiction: (id) => [host, prefix, 'articles', `${id}?fields=*,maidIn(title,code),category(title)`].join('/'),
};