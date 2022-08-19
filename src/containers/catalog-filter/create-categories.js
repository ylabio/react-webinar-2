export function createCategories(tree) {
  const categories = [];

  for (const branch in tree) {
    categories.push(...scanBranch({[branch]: tree[branch]}));
  }

  console.log({categories})

  return categories;
}

function scanBranch(branch) {
  const categories = [];

  (function _(tree, prefix) {
    for (const branchName in tree) {
      const data = tree[branchName].data;
      const children = tree[branchName].children;

      categories.push({
        value: prefix + branchName,
        data,
      })
      
      if (Object.keys(children).length) {
        const _prefix = prefix + '-';
        _(tree[branchName].children, _prefix)
      }    
    }
  })(branch, '')

  return categories;
}