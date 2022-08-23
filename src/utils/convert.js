

function convert(prop) {
   const cat = (data) => {
    // создаем ассоциативный массив с ключами айдишниками и добавляем к элементу поле children
    let mapList = {};
    data.forEach(item => mapList[item._id] = {...item, children: []});
    // console.log(mapList)

    // собираем дерево
    let tree = [];
    Object.values(mapList).forEach(item => {
      if (!item.parent) {
        tree.push(item)
      } else {
        mapList[item.parent._id].children.push(item)
      }
    });

    // обходим дерево рекурсивно и отбираем данные с форматированным title
    const treeToFlatList = (tree, level = 0) => {
      let result = [];
      tree.forEach(treeItem => {
        let {children, ...item} = treeItem;
        item.title = ' - '.repeat(level) + item.title;
        result.push(item);
        result = result.concat(treeToFlatList(children, level + 1))
      });
      return result
    };

    return treeToFlatList(tree)
  };
   return cat(prop)
}
//  = (data) => {
//     const getTree = (array, parent = null, inner = 0) => {
//         return array.reduce((arr, elem) => {
//             if (elem.parent && elem.parent._id !== parent) {
//                 return arr;
//             }
//
//             arr.push({
//                 ...elem,
//                 title: `${'-'.repeat(inner)}${elem.title}`,
//             });
//
//             const children = data.filter((item) => item.parent && item.parent._id === elem._id);
//             if(!children) {
//                 return arr;
//             }
//             const childArr = getTree(children, elem._id, inner + 1);
//             return arr.concat(childArr);
//         }, []);
//     }
//     return getTree(data);
// }
export default convert;