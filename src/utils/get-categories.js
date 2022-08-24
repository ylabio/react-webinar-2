/**
 * Создание массива категорий с учетом вложенности из
 * одномерного массива объектов с указателями на родительские элементы
 * @param elements {Array<Object>}
 * @returns {Array<Object>}
 */

export default function getCategories(elements) {
  // Создание дерева из начального массива
  const makeTree = (arr) => {
    // Добавляем элементам свойство parent со значением null, если оно отсутствует
    arr.map((item) => {
      if (!item.parent) {
        item.parent = {_id: null};
      }
    });

    const makeChildren = (items, _id = null) => items
      .filter(item => item.parent._id === _id)
      .map(item => ({...item, children: makeChildren(items, item._id)}));

    return makeChildren(elements);
  }

  // Обход дерева в глубину и добавление дефисов согласно уровню вложенности
  const makeList = (tree) => {
    const categories = [];
    const step = (item, level = '') => {
      categories.push({value: item._id, title: `${level} ${item.title}`});
      item.children.forEach((child) => step(child, `- ${level}`));
    }
    tree.forEach((item) => {
      step(item);
    });
    return categories;
  };

  // Создание дерева из начального массива
  const categoriesTree = makeTree(elements);
  // Создание списка категорий на основе дерева категорий
  return makeList(categoriesTree);
}
