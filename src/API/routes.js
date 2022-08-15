const host = '';
const prefix = 'api/v1';

export default {
  main: () => [host, '/'].join(''),
  basket: () => [host, 'basket'].join('/'),
  pagination: (limit, skip) => [host, prefix, `articles?limit=${limit}&skip=${skip}`].join('/'),
  itemPage: (id) => [host, prefix, 'articles', id].join('/'),
  itemDepiction: (id) => [host, prefix, 'articles', `${id}?fields=*,maidIn(title,code),category(title)`].join('/'),
};