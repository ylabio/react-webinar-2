export function getCommentsByFiltering(comments, productId) {
  return comments.filter(comment => {
    if (Object.keys(comment.parent).length === 0) return false;
    if (!comment.parent._tree) return false;
    
    for (const obj of comment.parent._tree) {
      if (obj._id === productId) return true;
    }

    return false;
  });
}