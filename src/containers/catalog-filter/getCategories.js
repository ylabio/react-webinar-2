import React from "react";

export const getCategories = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await (await fetch("/api/v1/categories")).json();

      setCategories(response.result.items);
    })();
  }, []);

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].parent) {
      console.log(categories[i].name);
    }
  }
};
