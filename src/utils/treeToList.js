export const treeToList = (items) => {
    let arr = []
  
    const recursion = (items) => {
      items.forEach((item) => {
        const category = {...item};
        arr.push(category);
        if (item?.children?.length) {
          recursion(item.children);
        } else return;
      });
    };
    recursion(items);
  
    return arr;
  
  }
  