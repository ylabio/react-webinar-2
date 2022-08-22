// Делаем структуру данных Map, чтобы можно было построить цепочку родителей и детей

export const makeTree = (categories) => {
  const result = categories
    .reduce((mapIterator, category) => {
      if (category.parent) {
        const { _id: _id, _key: _key } = category.parent;
        if (!mapIterator.has(_id)) mapIterator.set(_id, { _id, _key });
        const parent = mapIterator.get(_id);
        parent.children ??= [];
        if (!mapIterator.has(category._id)) {
          mapIterator.set(category._id, category);
        } else {
          Object.assign(mapIterator.get(category._id), category);
        }
        parent.children.push(mapIterator.get(category._id));
      } else {
        if (!mapIterator.has(category._id)) {
          mapIterator.set(category._id, category);
        } else {
          Object.assign(mapIterator.get(category._id), category);
        }
      }
      return mapIterator;
    }, new Map())
    .values();

  return Array.from(result).filter((item) => !item.parent);
};

// Ставим дефисы для вложенных категорий

export const putDashes = (tree) => {
  let result = [];
  if (!tree.length) {
    return;
  }

  let count = 0;
  let dash = '- ';
  let stack = [];
  tree.forEach((node) => {
    stack.push(node);
    result.push(node);
  });

  while (stack.length) {
    const node = stack.pop();

    if (node.children) {
      if (!node.parent) {
        count = 0;
      }
      count++;

      node.children.forEach((child) => {
        child = { ...child, title: `${dash.repeat(count)}${child.title}` };
        stack.push(child);
        result.push(child);
      });
    }
  }

  return result;
};

// Сортируем массив, чтобы в выпадашке красиво показывало

export const sortArray = (dashedArray) => {
  const sortedArr = dashedArray.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });

  const splicedPart = sortedArr.splice(sortedArr.length - 2, 2);
  sortedArr.splice(2, 0, ...splicedPart);
  return sortedArr;
};
