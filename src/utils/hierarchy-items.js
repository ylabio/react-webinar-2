function getHierarchyItems(items, idParent = undefined, dash = '') {
  let hierarchyItems = [];
  for (let i = 0; i < items.length; i++) {
    if (idParent === items[i].parent) {
      items[i].title = dash + items[i].title;
      hierarchyItems.push(items[i]);
      hierarchyItems.push(...getHierarchyItems(items, items[i].value, dash + '-'));
    }
  }
  return hierarchyItems;
}

export default getHierarchyItems;