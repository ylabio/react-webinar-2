function fn (arr, parent, result) {
  if (!parent) {
      return result;
  }

  if (parent) {
      parent = {...parent, hash: parent.hash ? parent.hash : ''};
      const childs = arr.filter(v => v.parent && (v.parent._id === parent._id)).map(v => ({...v, hash: v.hash || '-' + parent.hash }));
      const res = childs.reduce((acc, v) => [...acc, ...fn(arr, v, result)], []);
      return fn(arr, undefined, [...result, ...([parent, ...res])]);
  }
}