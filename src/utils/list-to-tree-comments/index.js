/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношеним на родителя
 * @param articleId {string} Id товара коментариев
 * @param key {String} Свойство с первичным ключём
 * @returns {Array} Корневые узлы
 */
export default function listToTreeComments(list, articleId, key = '_id') {
  let trees = {};
  for (const item of list) {

    // Добавление элемента в индекс узлов с создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиенные родителя
    if (item.parent?._id) {
      if (!trees[item.parent._id]) trees[item.parent._id] = {children: []};
      trees[item.parent._id].children.push(trees[item[key]]);
    }
  }

  return Object.values(trees[articleId].children);
}
