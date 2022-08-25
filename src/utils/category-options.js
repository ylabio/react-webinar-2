export default function getCategoriesOptions(optionsRaw) {
  const makeTree = (arr) => {
    arr.map((item) => {
      if (!item.parent) {
        item.parent = {_id: null};
      }
    });

    const makeChildren = (items, _id = null) => items
      .filter(item => item.parent._id === _id)
      .map(item => ({...item, children: makeChildren(items, item._id)}));

    return makeChildren(optionsRaw);
  }

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

  const categoriesTree = makeTree(optionsRaw);

  return makeList(categoriesTree);
}