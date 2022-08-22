/**
 * Преображает массив объектов из одной структуры в другую
 * @param {array} array
 * @returns {array}
 */

export function categoriesMap(array) {
  // топ категории, т.е. которые не являются подкатегориями
  const sortedCategories = array.filter(elem => !elem.hasOwnProperty('parent'));
  // остальные подкатегории
  const subCategories = array.filter(elem => elem.hasOwnProperty('parent'));

  for (let i = 0; i < sortedCategories.length; i++) {
    // поиск подкатегорий текующей категории
    const matches = subCategories.filter(
      elem => elem.parent['_id'] === sortedCategories[i]['_id']
    );
    // если подкатегории для текущей категории найдены, вставить сразу после нее
    if (matches.length) {
      sortedCategories.splice(i + 1, 0, ...matches);
    }
  }

  // оставляем из параметров категорий имя с добавлением '-' согласно вложенности и id
  return sortedCategories.map(elem => ({
    value: elem['_id'],
    title: `${addDashes(elem, sortedCategories)} ${elem.title}`
  }));
}

function addDashes(elem, arr) {
  if (elem.hasOwnProperty('parent')) {
    const parent = arr.find(item => item['_id'] === elem.parent['_id']);
    return '-' + addDashes(parent, arr);
  } else {
    return '';
  }
}
