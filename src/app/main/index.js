import React, { useCallback, useEffect } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import List from "../../components/list";
import Layout from "../../components/layout";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import LayoutHeader from "../../components/layout-header";
import Spinner from "../../components/spinner";
import translation from "../../utils/translation";

function Main() {
  console.log("Main");

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
    page: state.catalog.requestParameters?.page,
    limit: state.catalog.requestParameters?.limit,
    current: state.localization.current,
    loading: state.catalog.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang,
  }));

  useEffect(() => {
    store.get("catalog").load(select.page);
  }, [store]);

  const callbacks = {
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    onChangePage: useCallback(
      (page) => store.get("catalog").load(page),
      [store]
    ),
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    changeLng: useCallback(
      (lng) => store.get("localization").select(lng),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          link={`/article/${item._id}`}
          lang={select.current}
        />
      ),
      [select.current]
    ),
  };

  return (
    <Layout head={<h1>{translation(select.current, "title")}</h1>}>
      <LayoutHeader
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
        current={select.current}
        onChange={callbacks.changeLng}
        onOpen={callbacks.openModalBasket}
      />
      {select.loading ? (
        <Spinner />
      ) : (
        <List items={select.items} renderItem={renders.item} />
      )}
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onChangePage}
      />
    </Layout>
  );
}

export default React.memo(Main);
