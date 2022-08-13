import React, { useCallback, useEffect } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import List from "../../components/list";
import Layout from "../../components/layout";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import LayoutHeader from "../../components/layout-header";

function Main() {
  console.log("Main");

  const store = useStore();

  useEffect(() => {
    store.get("catalog").load();
  }, [store]);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
    page: state.catalog.requestParameters?.page,
    limit: state.catalog.requestParameters?.limit,
  }));

  const callbacks = {
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
        />
      ),
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
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
