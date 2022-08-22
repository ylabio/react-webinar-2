/**
 * Принимает search-строку и возвращает объект с get-параметрами и их значениями
 * вида {param1: [value1], param2: [value2, value3], param3: []} (у параметра может быть любое кол-во значений)
 * @param search {string}
 * @returns {Object}
 */
function getSearchParams(search) {
  const result = {};
  search
    .substring(1)
    .split('&')
    .forEach((item) => {
      const param = item.split('=');
      if (param[0] in result) {
        result[param[0]].push(param[1]);
      } else {
        result[param[0]] = [param[1]];
      }
    });
  return result;
}

/**
 * Создание строки запроса из объекта вида {param1: [value1], param2: [value2, value3], param3: []}
 * у параметра может быть любое кол-во значений
 * @param obj {Object}
 * @returns {string}
 */
function getSearchString(obj) {
  const allParams = [];

  Object.keys(obj).forEach((key) => {

    // собираем строку для каждого параметра вида "param2=value2&param2=value3"
    const singleParams = obj[key].map((value) => `${key}=${value}`).join('&');

    // добавляем эту строку в массив строк типа ["param1=value1", "param2=value2&param2=value3", "param3="]
    allParams.push(singleParams);
  });

  // склеиваем строки из массива в одну строку с разделителем  "&" и добавляем "?" в начало строки
  return `?${allParams.join('&')}`;
}

/**
 * Получает строку запроса с разделителями "&", параметр который нужно изменить, новые значения для этого параметра
 * @param initialStr {String} - строка запроса
 * @param param {String} - параметр, значения которого нужно изменить
 * @param newValue {String[]} - массив с новыми значениями
 * @returns {string}
 */
export default function getLink(initialStr, param, newValues) {
  const paramsObj = getSearchParams(initialStr);
  paramsObj[param] = newValues;
  const searchString = getSearchString(paramsObj);
  return searchString;
}
