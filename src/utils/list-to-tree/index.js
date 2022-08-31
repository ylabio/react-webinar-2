const listToTree = (list, key = "_id", options = {}) => {
  let trees = {};
  let roots = {};
  for (const item of list) {
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      if (item.parent?._id === options.exclude) item.parent = null;
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }
  }
  for (const item of list) {
    if (item.parent?._id) {
      if (!trees[item.parent._id]) trees[item.parent._id] = { children: [] };
      trees[item.parent._id].children.push(trees[item[key]]);
      if (roots[item[key]]) delete roots[item[key]];
    }
  }
  return Object.values(roots);
};

export default listToTree;
