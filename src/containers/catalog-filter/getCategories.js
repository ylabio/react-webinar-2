import React from "react";

export const getCategories = () => {
  const [categories, setCategories] = React.useState([]);
  console.log(categories);
  React.useEffect(() => {
    (async () => {
      const response = await fetch("/api/v1/categories");
      const json = await response.json();

      setCategories(json.result.items);
    })();
  }, []);

  const newArr = categories.map((item) => {
    if ("parent" in item) {
      const x = categories.find((itemX) => itemX._id === item.parent._id);
      if ("parent" in x) {
        return { ...item, title: ` - - ${item.title}` };
      }
      return { ...item, title: ` - ${item.title}` };
    }
    return item;
  });

  const func = () => {
    const arr2 = newArr.filter((item) => !item.parent);

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (newArr[i].parent) {
          if (newArr[i].parent._key === arr2[j]._key) {
            arr2.splice(j + 1, 0, newArr[i]);
          }
        }
      }
    }

    return arr2;
  };

  return func();
};
