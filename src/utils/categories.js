export default function categories(a, b) {
  let children = a;
  let parents = b;

  function createCategories() {
    let result = [];
    children.forEach((child) => (child.title = '-' + child.title));
    parents.forEach((parent) => {
      result.push(parent);
      [...children].forEach((child) => {
        if (child.parentId === parent.value) {
          result.push(child);
          children.shift();
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
