export const getCategoryItems = (items, idParent = undefined, dash = '') => {
  let categoryItems = [];
  for (let i = 0; i < items.length; i++) {
    if (idParent === items[i].parent) {
      items[i].title = dash + items[i].title;
      categoryItems.push(items[i]);
      categoryItems.push(...getCategoryItems(items, items[i].value, dash + '-'));
    }
  }
  return categoryItems;
}