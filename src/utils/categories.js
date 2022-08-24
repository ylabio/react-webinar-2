function categoriesPrefix(array, prefix = "") {
  let res = [];
  array.forEach(item => {
    res = [
      ...res,
      {value: item._id, title: prefix + item.title},
      ...(item.children ? categoriesPrefix(item.children, prefix + " - ") : {}),
    ];
  });
  return res;
}

export default function getCategories(elements) {
  const isParent = (arr) => {
    arr.map((item) => {
      if (!item.parent) {
        item.parent = {_id: null};
      }
    });
    const createChildren = (items, _id = null) => items
      .filter(item => item.parent._id === _id)
      .map(item => ({...item, children: createChildren(items, item._id)}));
    return createChildren(elements);
  }
  const parents = isParent(elements);
  return categoriesPrefix(parents);
}