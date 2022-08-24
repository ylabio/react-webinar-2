import React, { useCallback, useMemo } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-components/layout-flex";
import categoriesHandler from "../../utils/categorifier";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import CategorySelect from "../../components/category-select";

function CatalogFilter() {
  const store = useStore();

  useInit(
    async () => {
      await store.get("categories").initCategories();
    },
    [],
    { backForward: true }
  );

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.categories,
    waiting: state.categories.waiting,
    category: state.catalog.params.category,
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
    onCategoryChoice: useCallback(
      (category) => store.get("catalog").setParams({ category, page: 1 }),
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
    categories: useMemo(() => [
      { value: "", title: "Все" },
      ...categoriesHandler(select.categories),
    ]),
  };

  return (
    <LayoutFlex flex="start">
      <Spinner active={select.waiting}>
        <CategorySelect
          onChange={callbacks.onCategoryChoice}
          currentCategory={select.category}
          categories={options.categories}
        />
        {/* <Select
          onChange={callbacks.onCategoryChoice}
          value={select.category}
          options={options.categories}
        /> */}
      </Spinner>
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
