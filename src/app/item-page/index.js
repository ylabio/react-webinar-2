import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import ItemDescription from "../../components/item-description";
import Navigation from "../../components/navigation";


function ItemPage(){

  let { id } = useParams();
  const store = useStore();


  useEffect(() => {
    store.get('catalog').load();
  }, [])
  useEffect(() => {
    store.get('itemInfo').load(id);
  }, [id])


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
      <div className='Layout-header'>
        <Navigation/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </div>
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(ItemPage);
