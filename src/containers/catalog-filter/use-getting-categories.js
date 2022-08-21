import React, { useEffect, useState } from "react";
import { createCategoriesFromTree } from "./create-categories-from-tree";
import { createCategoryTree } from "./create-categoty-tree";

export function useGettingCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    (async () => {
      const response = await (await fetch('/api/v1/categories')).json()
      const categoriesTree = createCategoryTree(response.result.items);
      const _categories = createCategoriesFromTree(categoriesTree);
      _categories.unshift({value: 'all', title: 'Все'});
      setCategories(_categories);
    })()

  }, [])

  return [categories, setCategories];
}