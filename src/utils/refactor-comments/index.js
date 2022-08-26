/**
 * Преобразование списка в иерархию.
 * @param tree {Array} Иерархия - список узлов со свойством children.
 * @param [callback] {Function} Для пользовательского преобразования элемента.
 * @param [level] {Number} Начальный уровень вложенности.
 * @param [result] {Array} Результат функции - используется рекурсией.
 * @returns {Array} Корневые узлы
 */
import login from "../../app/login";

export function treeToComment(tree, callback, level = 0, result = []) {
  for (const item of tree) {
    result.push(callback ? callback(item, level) : item);
    if (item.children?.length) treeToComment(item.children, callback, level + 1, result);
  }
  return result;
}
/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношеним на родителя
 * @param key {String} Свойство с первичным ключём
 * @returns {Array} Корневые узлы
 */
export function commentToTree(list, key = '_id') {
  let trees = {};
  let roots = {};

  for (const item of list) {

    // Добавление элемента в индекс узлов с создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиенные родителя
    if (item.parent?._tree.length > 1) {
      // Если родителя ещё нет в индексе, то индек созадётся, ведь _id родителя известен
      if (!trees[item.parent._id]) trees[item.parent._id] = { children: [] };
      // Добавления в подчиенные родителя
      trees[item.parent._id].children.push(trees[item[key]]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[item[key]]) delete roots[item[key]];
    }
  }
  return Object.values(roots);
}
