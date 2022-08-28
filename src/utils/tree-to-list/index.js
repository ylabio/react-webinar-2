export default function treeToList (tree, callback, level = 0, result = []){
  for (const item of tree){
    result.push(callback ? callback(item, level) : item)
    if(item.children?.length) treeToList(item.children, callback, level + 1, result)
  }
  return result
}