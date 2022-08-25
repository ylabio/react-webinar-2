export default function createCategories(aArr, bArr) {
  let result = [];

  aArr.forEach((child) => (child.title = '- ' + child.title));

  bArr.forEach((parent) => {
    result.push(parent);
    aArr.forEach((child) => {
      if (child.parent._id === parent.value) {
        result.push(child);
        aArr = aArr.filter((i) => i.value !== child.value);
      }
    });
  });
  bArr = result;

  if (aArr.length === 0) return bArr;

  return createCategories(aArr, bArr);
}
