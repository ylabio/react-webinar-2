const makeTree = (arr) => {
  const tree = Object.fromEntries(
    arr.map((item) => [
      item.id,
      { ...item, parentId: item?.parentId, children: [] },
    ])
  );
  return Object.values(tree).filter(
    (item) => !tree[item.parentId]?.children.push(item)
  );
}

const addLabels = (arr, prefix = "") => {
  let result = [];
  arr.forEach((item) => {
    result = [
      ...result,
      { value: item.id, title: prefix + item.title },
      ...(item.children
        ? addLabels(item.children, prefix + "-")
        : {}),
    ];
  });
  return result;
}

export {makeTree, addLabels};