import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useRef} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemInfo from "../../components/item-info";
import {useParams} from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";

function ItemPage() {

  console.log('ItemPage');

  const store = useStore();

  const select = useSelector(state => ({
    itemInfo: state.itemPage.itemInfo,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const {id} = useParams();

  useEffect(() => {
    store.get('itemPage').load(id)
  }, [id]);

  return (
    <Layout head={<h1>{select.itemInfo.title}</h1>}>
      <Header>
        <Navbar />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Header>
      <ItemInfo {...select.itemInfo} addToBasket={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(ItemPage);
