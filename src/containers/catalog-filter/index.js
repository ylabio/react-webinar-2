import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    categoryList: state.catalog.categoryList,
    query: state.catalog.params.query,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort) => store.get("catalog").setParams({ sort }), []),
    // Сортировка
    filterCategory: useCallback((category) => store.get("catalog").setParams({ category }), []),
    // Поиск
    onSearch: useCallback(
      (query) => store.get("catalog").setParams({ query, page: 1 }),
      []
    ),
    // Сброс
    onReset: useCallback(() => store.get("catalog").resetParams(), []),
  };

  // useEffect(() => {

  //   (async function rec() {
  //     store.get("catalog").getCategory();

  //     let items = await store.get("catalog").getCategory();
  //     console.log("category: ", items);

  //     let tree = [];
  //     for (let i = 0; i < items.length; i++) {
  //       items[i].level = 0;
  //       const getLevel = (item) => {
  //         if (item?.parent?._id) {
  //           const parent = items.find(
  //             (parent) => item.parent._id === parent._id
  //           );

  //           if (parent) {
  //             if (parent.children?.length) {
  //               !parent.children.includes(item) && parent.children.push(item);
  //             } else parent.children = [item];
  //             items[i].level++
  //             getLevel(parent);
  //           } else return;
  //         } else return;
  //       };
  //       getLevel(items[i]);
  //       if (items[i].level === 0) tree.push(items[i]);
  //       else continue;
  //     }
  //     console.log("tree: ", tree);

  //     let categoryList = [];
  //     const setArray = (items) => {
  //       items.forEach((item) => {
  //         const cat = {
  //           title: `${'-'.repeat(item.level)}${item.title}`,
  //           value: item._id
  //         }
  //         categoryList.push(cat);
  //         if (item?.children?.length) {
  //           setArray(item.children);
  //         } else return;
  //       });
  //     };
  //     setArray(tree);
  //     console.log("categoryList: ", categoryList);

  //     setCategoryList(prev => [...prev, ...categoryList])
      
  //   })();

  // }, []);

  // Опции для полей
  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    )
  };

  return (
    <LayoutFlex flex="start">
      <Select
        onChange={callbacks.filterCategory}
        value={select.category}
        options={select.categoryList}
      />
      <Select
        onChange={callbacks.onSort}
        value={select.sort}
        options={options.sort}
      />
      <Input
        onChange={callbacks.onSearch}
        value={select.query}
        placeholder={"Поиск"}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
