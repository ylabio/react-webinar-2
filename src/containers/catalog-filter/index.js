import React, { useCallback, useMemo } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import { getCategories } from "./getCategories";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const categories = [{ title: "Все", value: "all" }, ...getCategories()];

  const { t } = useTranslate();

  const callbacks = {
    onFilterCategory: useCallback(
      (category) => store.get("catalog").setParams({ category, page: 1 }),
      []
    ),
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

  console.log(categories);

  return (
    <LayoutFlex flex="start" padding="20">
      <Select
        onChange={callbacks.onFilterCategory}
        options={categories}
        value={select.filter}
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
