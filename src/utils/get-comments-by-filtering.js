export function getCommentsByFiltering(comments, productId) {
  return comments.filter(comment => {
    return comment.parent._id === productId;
  });
}