export function createCommentList(list) {
  let trees = {};
  let roots = {};

  for (const comment of list) {
    const currentId = comment._id;
    const parentId = comment.parent._id;
    const parentType = comment.parent._type;
  
    if (!trees[currentId]) {
      trees[currentId] = comment;
      trees[currentId].children = [];
      
      if (parentType === 'article') {
        roots[currentId] = trees[currentId];
      } 

      if (parentType === 'comment') {
        if (!trees[parentId]) {
          trees[parentId] = { children: [] };
        };
  
        trees[parentId].children.push(trees[currentId]); 
      }
    } 
  }

  const comments = treeToComments(roots);

  return comments;
}

function treeToComments(tree) {
  const comments = [];

  for (const branch in tree) {
    comments.push(scanBranch({[branch]: tree[branch]}));
  }

  return comments;
}

function scanBranch(branch, store = [], lvl = 0) {
  for (const id in branch) {
    store.push({
      comment: branch[id],
      lvl: lvl,
    })

    scanBranch(branch[id].children, store, lvl + 1);
  }

  return store;
}