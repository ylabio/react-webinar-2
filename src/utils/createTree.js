export const createTree = (items) => {
    let tree = [];
    for (let i = 0; i < items.length; i++) {
      items[i].level = 0;
      const getLevel = (item) => {
        if (item?.parent?._id) {
          const parent = items.find((parent) => item.parent._id === parent._id);
  
          if (parent) {
            if (parent.children?.length) {
              !parent.children.includes(item) && parent.children.push(item);
            } else parent.children = [item];
            items[i].level++;
            getLevel(parent);
          } else return;
        } else return;
      };
      getLevel(items[i]);
      if (items[i].level === 0) tree.push(items[i]);
      else continue;
    }
    return tree
  }