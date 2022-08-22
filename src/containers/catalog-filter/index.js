import React, { useCallback, useMemo } from "react";
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
    category_choice: state.catalog.params.category_choice,
    arrayCategory: state.catalog.category,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort) => store.get("catalog").setParams({ sort }), []),
    // Сортировка по категориям
    onCategory: useCallback(
      (category_choice) =>
        store.get("catalog").setParams({ category_choice, page: 1 }),
      []
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.get("catalog").setParams({ query, page: 1 }),
      []
    ),
    // Сброс
    onReset: useCallback(() => store.get("catalog").resetParams(), []),
  };

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
  };

  const category = {
    sort: useMemo(() =>
      [
        { value: "", title: "Все" },
        ...select.arrayCategory.map((item, index, array) => {
          let line = 0;
          let order = item.order;
          if (item.parent) {
            if (array.filter((i) => i._key === item.parent._key)[0].parent) {
              order = item.parent._key;
            }

            function rec(array, item) {
              line++;
              order = item.parent._key;
              let newArray = array.filter((i) => i._id === item.parent._id)[0];
              if (newArray.parent) {
                rec(array, newArray);
              } else {
                return;
              }
            }

            rec(array, item);
          }

          return {
            value: item._id,
            title: `${Array.from([...new Array(line)].map(() => "-")).join(
              " "
            )} ${item.title}`,
            order: +order * 1000 + item.order,
          };
        }),
      ].sort((a, b) => a.order - b.order)
    ),
  };

  // console.log(category);

  return (
    <LayoutFlex flex="start">
      <Select
        onChange={callbacks.onCategory}
        value={select.category_choice}
        options={category.sort}
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

// if (item.parent) {
//   line++;
//   let qq = array.filter((i) => i._id === item.parent._id)[0].parent;

//   if (qq) {
//     line++;
//     qq = array.filter((i) => i._id === qq._id)[0].parent;
//     if (qq) {
//       line++;
//     }
//   }
// }
