export default function categoriesHandler(categories) {
  const objectFromArr = Object.fromEntries(
    categories.map((category) => [
      category._id,
      {
        value: category._id,
        title: category.title,
        parentId: category.parent?._id,
        children: [],
      },
    ])
  );

  const categoriesTree = Object.values(objectFromArr).filter(
    (category) => !objectFromArr[category.parentId]?.children.push(category)
  );

  const treeToArray = (categoriesTree, prefix = "") => {
    let result = [];
    categoriesTree.forEach((branch) => {
      result = [
        ...result,
        { value: branch.value, title: prefix + branch.title },
        ...(branch.children && treeToArray(branch.children, prefix + "- ")),
      ];
    });
    return result;
  };

  return treeToArray(categoriesTree);
}

// для собственного сочинения алгоритм оказался слишком тяжел
// позаимствовал идеи с ресурса ниже и в других местах
// https://thewebdev.info/2021/04/25/how-to-build-a-tree-array-from-flat-array-in-javascript/
