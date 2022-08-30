export default function countChildren(parent, mas, count = 0) {
  if (parent.children.length) {
    count += parent.children.length;
    parent.children.forEach(item => {
      let elem = mas.find(e => e._id === item._id);
      if (elem.children.length !== 0) count = countChildren(elem, mas, count);
    });
  }
  return count;
}