import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router";
import ItemDescription from "../../components/item-description";

function ItemPage() {
  console.log('ItemPage');

  const store = useStore();
  const { _id } = useParams();

  useEffect(() => {
    store.get('itemData').loadById(_id);
  }, [_id])

  const itemData = useSelector(state => ({
    description: state.itemData.description,
    maidIn: state.itemData.maidIn?.title,
    maidInCode: state.itemData.maidIn?.code,
    category: state.itemData.category?.title,
    edition: state.itemData.edition,
    price: state.itemData.price,
  }));

  const { title, sum, amount } = useSelector(state => ({
    title: state.itemData.title,
    sum: state.basket.sum,
    amount: state.basket.amount,
  }))

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),  //без разницы useCallback(() => ... || () => {...})
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  }

  return (
    <Layout head={<h1>{title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum} />
      <ItemDescription itemData={itemData} />
      <button onClick={() => callbacks.addToBasket(_id)}
        style={{ marginLeft: "40px" }}>
        Добавить
      </button>
    </Layout>
  )
}

export default React.memo(ItemPage);
