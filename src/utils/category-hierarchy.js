export default function getCategoryHierarchy(list, pId = undefined, separator = '') {
  const categories = [];
  list.forEach((item) => {
    if (pId === item.parent) {
      item.title = separator + item.title;
      categories.push(item, ...getCategoryHierarchy(list, item.value, `${separator}-`));
    }
  });
  return categories;
}
