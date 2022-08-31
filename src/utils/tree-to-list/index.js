/**
 * Преобразование списка в иерархию.
 * @param tree {Array} Иерархия - список узлов со свойством children.
 * @param [callback] {Function} Для пользовательского преобразования элемента.
 * @param [level] {Number} Начальный уровень вложенности.
 * @param [result] {Array} Результат функции - используется рекурсией.
 * @returns {Array} Корневые узлы
 */
export default function treeToList(tree, callback, level = 0, result = [], childrenProp = 'children') {
  for (const item of tree) {
    result.push(callback ? callback(item, level) : item);
    if (item[childrenProp]?.length) treeToList(item[childrenProp], callback, level + 1, result);
  }
  return result;
}
