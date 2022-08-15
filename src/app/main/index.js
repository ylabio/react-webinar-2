import React, { useCallback, useEffect } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import List from "../../components/list";
import Layout from "../../components/layout";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import LayoutHeader from "../../components/layout-header";
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
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          link={`/article/${item._id}`}
          lng={select.current}
        />
      ),
      [select.current]
    ),
  };

  return (
    <Layout head={<h1>{translation(select.current, "title")}</h1>}>
      <LayoutHeader />
      <List items={select.items} renderItem={renders.item} />
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
