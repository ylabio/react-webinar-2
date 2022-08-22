import React from "react";

export const getCategories = () => {
  const [categories, setCategories] = React.useState([]);

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
        return { ...item, title: ` - - ${item.title}`, value: item._id };
      }
      return { ...item, title: ` - ${item.title}`, value: item._id };
    }
    return { ...item, name: item.name, value: item._id };
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
