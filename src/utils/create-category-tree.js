export default function createCategoryTree(obj, array) {
  let arr = array.filter(i => i.parent&&i.parent._id === obj.value).map(i => ({value: i._id, title: i.title}));
  if (arr.length) {
    obj.children  = arr;
    obj.children.forEach(i => createCategoryTree(i, array))
  }
}
  