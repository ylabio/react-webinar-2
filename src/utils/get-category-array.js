/**
 * Конструирует иерархический массив категорий
 * @param array
 * @returns {array}
 */
export default function buildCategoryArray(array) {
  const parentChildMap = {};
  const itemsWithoutParent = [];
  const resultArray = [];

  array.forEach(item => {
    if (item.parent) {
      !parentChildMap[item.parent._id]
        ? parentChildMap[item.parent._id] = [item]
        : parentChildMap[item.parent._id].push(item);
    } else {
      itemsWithoutParent.push(item);
    }
  });

  function processItem(item, n) {
    resultArray.push({ value: item._id, title: '- '.repeat(n) + item.title });

    const childrens = parentChildMap[item._id];
    if (!childrens) {
      return;
    }
    childrens.forEach(item => processItem(item, n + 1));
  }
  itemsWithoutParent.forEach(item => processItem(item, 0));

  return resultArray;
}

