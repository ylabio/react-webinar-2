/**
 * Создание дерева категорий
 * @param categories
 * @returns {array}
 */
export default function getCategoryTree(categories){
  //За основу взял отсюда https://qna.habr.com/q/784213
  const categoryTree = Object.fromEntries(
    categories.map(category => [category._id, {title: category.title, _id: category._id, parent_id: category.parent?._id, children: []}])
  );
  const treeData = Object.values(categoryTree).filter(
    (category) => !categoryTree[category.parent_id]?.children.push(category)
  );
  return createCategoryNesting(treeData);
};

function createCategoryNesting(array, dash = "") {
  let tree = [];
  array.forEach((item) => {
    tree.push({value: item._id, title: dash + item.title}, ...(item.children ? createCategoryNesting(item.children, dash + "-") : {}))
  });
  return tree;
}
