export function sortByParents(dataset) {
  return _treesToFlat(_createTrees(dataset));
}

function _createTrees(dataset) {
  const dict = {};
  dataset.forEach(data => (dict[data._id] = {...data, children: []}));
  const dataTree = [];
  dataset.forEach(data => {
    if (data.parent) dict[data.parent._id].children.push(dict[data._id]);
    else dataTree.push(dict[data._id]);
  });
  return dataTree;
}

function _treesToFlat(trees, sign = '') {
  const result = [];
  if (trees === undefined) return;
  trees.forEach(node => {
    node.title = sign + node.title;
    result.push(node);
    result.push(..._treesToFlat(node.children, sign + '-'));
  });
  return result;
}
