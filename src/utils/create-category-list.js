export default function createCategoryList(obj, numRepeat, array) {
  array.push({value: obj.value, title: `${'- '.repeat(numRepeat)} ${obj.title}`});
    if(obj.children){
      numRepeat ++;
      obj.children.forEach(i=>createCategoryList(i, numRepeat, array));   
    }
}
