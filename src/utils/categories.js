export function fn (arr, parent, result) {
  if (!parent) {
      return result;
  }

  if (parent) {
      parent = {...parent, hash: parent.hash ? parent.hash : ''};

      const childs = arr.filter(child => child.parent && (child.parent._id === parent._id))
        .map(child => ({...child, hash: child.hash || '- ' + parent.hash }));

      const res = childs.reduce((acc, item) => [...acc, ...fn(arr, item, result)], []);
      return fn(arr, undefined, [...result, ...([parent, ...res])]);
  }
}