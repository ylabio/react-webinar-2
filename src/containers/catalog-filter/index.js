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
    query: state.catalog.params.query,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort) => store.get("catalog").setParams({ sort }), []),
    // Поиск
    onSearch: useCallback(
      (query) => store.get("catalog").setParams({ query, page: 1 }),
      []
    ),
    // Сброс
    onReset: useCallback(() => store.get("catalog").resetParams(), []),
  };

  const [categoryList, setCategoryList] = useState([{title: 'Все', value: ''}]);

  useEffect(() => {
    // const res = store.get("catalog").getCategory();
    // let cats = [];

    (async function rec() {
      let items = await store.get("catalog").getCategory();
      console.log("category: ", items);

      let tree = [];
      for (let i = 0; i < items.length; i++) {
        items[i].level = 0;
        const getLevel = (item) => {
          if (item?.parent?._id) {
            const parent = items.find(
              (parent) => item.parent._id === parent._id
            );

            if (parent) {
              if (parent.children?.length) {
                !parent.children.includes(item) && parent.children.push(item);
              } else parent.children = [item];
              items[i].level++
              getLevel(parent);
            } else return;
          } else return;
        };
        getLevel(items[i]);
        if (items[i].level === 0) tree.push(items[i]);
        else continue;
      }
      console.log("tree: ", tree);

      let categoryList = [];
      const setArray = (items) => {
        items.forEach((item) => {
          const cat = {
            title: `${'-'.repeat(item.level)}${item.title}`,
            value: item._id
          }
          categoryList.push(cat);
          if (item?.children?.length) {
            setArray(item.children);
          } else return;
        });
      };
      setArray(tree);
      console.log("categoryList: ", categoryList);

      setCategoryList(prev => [...prev, ...categoryList])
      
    })();

    // res
    //   .then((res) => (cats = res.result.items))
    //   .then(() => {
    //     return cats.map((cat) => {
    //       cat.level = 0;
    //       const getLevel = (item) => {
    //         if (item?.parent?._id) {
    //           const parent = cats.find(
    //             (parent) => item.parent._id === parent._id
    //           );

    //           if (parent) {
    //             if (parent.children?.length) {
    //               !parent.children.includes(item) && parent.children.push(item);
    //             } else parent.children = [item];
    //             cat.level = cat.level + 1;
    //             getLevel(parent);
    //           } else return;
    //         } else return;
    //       };
    //       getLevel(cat);
    //       if (cat.level === 0) return cat;
    //       else return {};
    //     });
    //   })
    //   .then((res) => {
    //     let newArray = [];
    //     const setArray = (items) => {
    //       items.forEach((item) => {
    //         Object.keys(item).length !== 0 && newArray.push(item);
    //         if (item?.children?.length) {
    //           setArray(item.children);
    //         } else return;
    //       });
    //     };
    //     setArray(res);
    //     console.log(newArray);
    //     console.log(res);
    //   });
  }, []);

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
    ),
    category: useMemo(
      () => [
        { value: "1", title: "11" },
        { value: "2", title: "22" },
        { value: "3", title: "33" },
        { value: "4", title: "44" },
      ],
      []
    ),
  };

  return (
    <LayoutFlex flex="start">
      <Select
        onChange={() => {}}
        value={categoryList}
        options={categoryList}
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
