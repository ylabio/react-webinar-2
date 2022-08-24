function getHierarchyItems(items, dash = '') {
  let hierarchyItems = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].children) {
      items[i].title = dash + items[i].title;
      hierarchyItems.push(items[i]);
      hierarchyItems.push(...getHierarchyItems(items[i].children, dash + '- '))
    } else {
      items[i].title = dash + items[i].title;
      hierarchyItems.push(items[i])
    }
  }
  return hierarchyItems;
}

export default getHierarchyItems;