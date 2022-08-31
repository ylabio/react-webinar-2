/**
 * Массив преобразуем в Map с ключами в виде key
 * @param {array} array
 * @param {string} key
 * @returns {object}
 */

export function arrayToMap(array, key = '_id') {
  return array.reduce((acc, curr) => {
    acc[curr[key]] = curr.profile;
    return acc;
  }, {});
}
