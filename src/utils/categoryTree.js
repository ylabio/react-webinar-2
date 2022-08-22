const getTree = (categories, parentId = undefined, separator = '') => {
  const result = [];

  const sortedCategories = categories.map((category) => {
    return {
      title: category.title,
      value: category._id,
      parent: category.parent?._id,
    };
  });

  sortedCategories.forEach((item) => {
    if (parentId === item.parent) {
      item.title = `${separator}${item.title}`;
      result.push(item, ...getTree(categories, item.value, `${separator}-`));
    }
  });

  return result;
};

export default getTree;
