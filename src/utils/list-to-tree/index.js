export default function listToTree(list, key = '_id'){
  let trees = {}
  let roots = {}
  for(const item of list) {
    if(!trees[item[key]]){
      trees[item[key]] = item;
      trees[item[key]].children = []
  
      roots[item[key]] = trees[item[key]]
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item)
    }
    
    if(item.parent?._id){
      if(!trees[item.parent?._id]) trees[item.parent?._id] = { children: []}
      
      trees[item.parent?._id].children.push(trees[item[key]])
      
      if(roots[item[key]]) delete roots[item[key]]
    }
  }
  return Object.values(roots)
}