function formCategories(categories) {
  let tree = categories.filter((item) => !item.parent);
  let select_list = [];
  tree.forEach((item) => {
    item.children = [];
    appendChildTo(item, categories);
    setSelectItem(item, 1, select_list);
  });
  return select_list;
}

function appendChildTo(node, array) {
  array.forEach((item) => {
    if (item.parent && node._id === item.parent._id) {
      item.children = [];
      node.children.push(item);
      appendChildTo(item, array);
    }
  });
}

function setSelectItem(item, level, select_list) {
  let prefix = "";
  for (let i = 1; i < level; i++) {
    prefix = prefix.concat("- ");
  }
  const title = prefix.concat(item.title);
  select_list.push({ value: item._id, title });
  item.children.forEach((item) => setSelectItem(item, level + 1, select_list));
}

export default formCategories;
