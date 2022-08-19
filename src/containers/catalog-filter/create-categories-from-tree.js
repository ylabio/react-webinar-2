export function createCategoriesFromTree(tree) {
  const categories = [];

  for (const branch in tree) {
    categories.push(...scanBranch({[branch]: tree[branch]}));
  }

  return categories;
}

function scanBranch(branch) {
  const categories = [];

  (function _(tree, prefix) {
    for (const branchName in tree) {
      const data = tree[branchName].data;
      const children = tree[branchName].children;

      categories.push({
        value: data._id,
        title: prefix + ' ' + data.title,
      })
      
      if (Object.keys(children).length) {
        const _prefix = prefix + '-';
        _(tree[branchName].children, _prefix)
      }    
    }
  })(branch, '')

  return categories;
}