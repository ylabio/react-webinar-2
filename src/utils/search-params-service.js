import qs from 'qs';

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
    encode: false
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true
  }
}

// Функция для получения объекта с параметрами адресной строки
export function parseParams() {
  const urlParams = qs.parse(window.location.search, QS_OPTIONS.parse) || {}

  let validParams = {};

  if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
  if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
  if (urlParams.category) validParams.category = urlParams.category;
  if (urlParams.sort) validParams.sort = urlParams.sort;
  if (urlParams.query) validParams.query = urlParams.query;
  
  return validParams;
}

// Функция для получения строки из объекта с параметрами
export function stringifyParams(paramsObj) {
  return qs.stringify(paramsObj, QS_OPTIONS.stringify);
}
