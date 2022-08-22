/**
 * Получает объект с параметрами адресной строки, вносит изменения и возвращает строку с измененными параметрами
 * @param params {Object} - объект {param: value}
 * @param param {String} - параметр, значения которого нужно изменить
 * @param newValue {String} - новое значение
 * @returns {string}
 */
export default function getLink(params, param, newValue) {
  // создаем копию, чтобы не мутировать исходный объект
  const copyParams = Object.assign({}, params);
  copyParams[param] = newValue;
  const allParams = [];

  // Создаем массив из строк вида "['param1=value1', 'param2=value2']"
  Object.keys(copyParams).forEach((key) => {
    const singleParams = `${key}=${copyParams[key]}`;
    allParams.push(singleParams);
  });

  return `?${allParams.join('&')}`;
}
