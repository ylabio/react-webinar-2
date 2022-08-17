import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import ItemInfo from "../../components/item-info";
import Spinner from "../../components/spinner";
import Header from "../../components/header";

function ItemPage() {
  console.log("ItemPage");
  const { articleId } = useParams();

  const store = useStore();

  useEffect(() => {
    store.get("item").loadOne(articleId);
  }, [articleId]);
  const select = useSelector((state) => ({
    isLoading: state.item.isLoading,
    description: state.item.description,
    id: state.item._id,
    title: state.item.title,
    edition: state.item.edition,
    price: state.item.price || 1,
    country: state.item.country,
    category: state.item.category,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.title}</h1>}>
      <Header
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {select.isLoading ? <Spinner /> : null}

      <ItemInfo addToBasket={callbacks.addToBasket} select={select} />
    </Layout>
  );
}

export default React.memo(ItemPage);
