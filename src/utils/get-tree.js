export function getTree(list) {
    const map = {}; 
    const roots = [];
    const tree = [{value: '', title: 'Все'}];
    
    for (let i = 0; i < list.length; i++) {
      map[list[i]._id] = i;
      list[i].children = [];
    }
  
    for (let i = 0; i < list.length; i += 1) {
      let node = list[i];
      
      if (node.parent) {
        list[map[node.parent._id]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    function buildList (arr, n) {
      arr.forEach((item)=>{
      let tmp = item.children;
      let dash = "- ";
      
      if (n) {
      item.title = dash+item.title;
      dash = dash + "- ";
      }

      tree.push({value: item._id, title: item.title});
      
      if (tmp.length > 1 ) {
        buildList(tmp, true);
      }else{
        while(tmp.length>0){
          tmp.map(item=>{
            item.title = dash+item.title;
            tree.push({value: item._id, title: item.title});
          });
          dash = dash + "- ";
          tmp = tmp[0].children;
        }
      }
    });
  }
  buildList(roots, null);
  return tree;
}
