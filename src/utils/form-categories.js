function formCategories(categories) {
  let tree = categories.filter((item) => !item.parent);
  let select_list = [];
  tree.forEach((item) => {
    select_list.push({ value: item._id, title: item.title });
    addItem(item, categories, 1, select_list);
  });
  return select_list;
}

function addItem(node, array, level, select_list) {
  array.forEach((item) => {
    if (item.parent && node._id === item.parent._id) {
      let prefix = "";
      for (let i = 0; i < level; i++) {
        prefix = prefix.concat("- ");
      }
      const title = prefix.concat(item.title);
      select_list.push({ value: item._id, title });
      addItem(item, array, level + 1, select_list);
    }
  });
}

export default formCategories;
