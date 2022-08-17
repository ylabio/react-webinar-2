import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import ItemDetails from "../../components/item-details";
import Menu from "../../components/menu";

function ItemPage() {
  const store = useStore();
  const params = useParams();

  const { amount, sum, item } = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.item,
  }));

  useEffect(() => {
    store.get("catalog").setItem(params.id);
    store.get("modals").close();
  }, [params.id]);

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{item && item.title}</h1>}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Menu />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum} />
      </div>
      {item && <ItemDetails item={item} onAdd={callbacks.addToBasket} />}
    </Layout>
  );
}

export default React.memo(ItemPage);
