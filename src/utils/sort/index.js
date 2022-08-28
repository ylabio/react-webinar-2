export function sortComments(array) {
  return array
    .map((item) => {
      return {
        ...item,
        position: [
          item.parent._tree
            .map((i) => i._id)
            .reverse()
            .join("") + item._id,
        ],
      };
    })
    .sort((a, b) => a.position[0].localeCompare(b.position[0]));
}
