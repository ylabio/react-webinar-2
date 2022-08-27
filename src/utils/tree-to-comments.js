  
export function treeToComments(tree) {
  const comments = [];

  for (const branch in tree) {
    comments.push(scanBranch({[branch]: tree[branch]}));
  }

  console.log('finalComments', comments)

  return comments;
}

function scanBranch(branch, store = [], lvl = 0) {
  for (const id in branch) {
    store.push({
      comment: branch[id].data,
      lvl: lvl,
    })

    scanBranch(branch[id].children, store, lvl + 1);
  }

  return store;
}