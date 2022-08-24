export default function categories(arr) {
  let children = [];
  let parents = [];

  arr.forEach((item) => {
    if (!item.parent) {
      parents.push({ value: item._id, parent: null, title: item.title });
    } else {
      children.push({
        value: item._id,
        parent: item.parent,
        title: item.title,
      });
    }
  });

  function createCategories() {
    let result = [];
    children.forEach((child) => {
      child.title = '- ' + child.title;
    });
    parents.forEach((parent) => {
      result.push(parent);
      children.forEach((child, index) => {
        if (child.parent._id === parent.value) {
          result.push(child);
          children.splice(index, 1);
        }
      });
    });
    parents = result;
    if (children.length === 0) return;
    result = [];
    return createCategories();
  }

  createCategories();

  return parents;
}
