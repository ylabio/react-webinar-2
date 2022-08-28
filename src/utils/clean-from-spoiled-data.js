export function cleanFromSpoiledData(list) {
  return list.filter(comment => {
    if (comment.parent._tree.length === 1) {
      if (comment.parent._tree[0]._type === 'comment') {
        return false;
      }
    }

    return true;
  });
}