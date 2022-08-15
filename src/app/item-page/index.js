import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import ItemDescription from "../../components/item-description";


function ItemPage(){

  const { id } = useParams();
  const store = useStore();

  console.log(id);

  useEffect(() => {
    store.get('itemInfo').load(id);
  }, [])


  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const select = useSelector(state => ({
    item: state.itemInfo.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));


  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(ItemPage);
