export function createCategoryTree(data) {
  const [tree, ids] = findRootNodes(data);
  let items = [...data.filter(item => {
    return !ids.includes(item._id);
  })];

  let flag = false;

  do {
    flag = false;

    for (const branch of Object.keys(tree)) {
      for (const item of items) {
        if (item.parent) {
          const itemParentId = item.parent._id;
  
          const node = findNodeToAttachChildren(
            itemParentId, 
            {[branch]: tree[branch]}
          );
  
          if (node) {
            node.children[item.name] = {
              data: item,
              children: {}
            };
  
            items = items.filter(_item => {
              return _item._id !== item._id;
            });
  
            flag = true;
          }
        }
      }
    }

  } while (flag) 

  return tree;
}

function findNodeToAttachChildren(itemParentId, tree) {
  for (const node of Object.keys(tree)) {
    const parentId = tree[node].data._id;
    const children = tree[node].children

    if (parentId === itemParentId) {
      return tree[node];
    } else {
      if (Object.keys(children).length) {
        return findNodeToAttachChildren(itemParentId, children)
      }
    } 
  }
} 

function findRootNodes(data) {
  const tree = {};
  const ids = [];

  for (const item of data) {
    if (!item.parent) {
      tree[item.name] = {
        data: item,
        children: {}
      };

      ids.push(item._id);
    }
  }

  return [tree, ids];
}
