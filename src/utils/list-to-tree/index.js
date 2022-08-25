/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношеним на родителя
 * @param key {String} Свойство с первичным ключём
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id') {
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
    if (item.parent?._id) {
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
