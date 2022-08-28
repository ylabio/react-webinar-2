export function createCommentList(list) {
  let trees = {};
  let roots = {};

  for (const comment of list) {
    const commentId = comment._id;
    const parentId = comment.parent._id;
    const parentType = comment.parent._type;
  
    if (!trees[commentId]) {
      trees[commentId] = comment;
      trees[commentId].children = [];
      roots[commentId] = trees[commentId];
    } else {
      trees[commentId] = {...trees[commentId], ...comment};
    }

    if (parentId && parentType === "comment") {
      if (!trees[parentId]) {
        trees[parentId] = { children: [] };
      };

      trees[parentId].children.push(trees[commentId]);

      if (roots[commentId]) {
        delete roots[commentId];
      };
    }
  }

  return treeToComments(roots);
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