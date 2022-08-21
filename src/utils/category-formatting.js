/**
 * Форматирует JSON категорий в массив select
 * @param array
 * @returns {array|array}
 */
export default function categoriesToLabel(array) {
  return categoriesTreeToLabels(categoriesToTree(array));
}

function categoriesToTree(array) {
  const tree = Object.fromEntries(
    array.map((item) => [
      item._id,
      { ...item, parent_id: item.parent?._id, children: [] },
    ])
  );
  return Object.values(tree).filter(
    (item) => !tree[item.parent_id]?.children.push(item)
  );
}

function categoriesTreeToLabels(array, prefix = "") {
  let res = [];
  array.forEach((item) => {
    res = [
      ...res,
      { value: item._id, title: prefix + item.title },
      ...(item.children
        ? categoriesTreeToLabels(item.children, prefix + "-")
        : {}),
    ];
  });
  return res;
}
