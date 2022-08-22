function changeCategories(elements) {
  function addDash(array, dash = "") {
    let res = [];
    array.forEach((item) => {
      res = [
        ...res,
        { value: item._id, title: dash + item.title },
        ...(item.children ? addDash(item.children, dash + "-") : {}),
      ];
    });
    return res;
  }

  const isParent = (arr) => {
    arr.map((item) => {
      if (!item.parent) {
        item.parent = { _id: null };
      }
    });
    const createChildren = (items, _id = null) =>
      items
        .filter((item) => item.parent._id === _id)
        .map((item) => ({
          ...item,
          children: createChildren(items, item._id),
        }));
    return createChildren(elements);
  };
  const parents = isParent(elements);
  return addDash(parents);
}

export default changeCategories;
