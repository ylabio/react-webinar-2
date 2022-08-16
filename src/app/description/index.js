import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import {useParams} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemDescription from "../../components/item-description";
import Menu from "../../components/menu";

function Description(){
  console.log('Description');
  const {_id} = useParams()

  useEffect(() => {
    store.get('description').load(_id);
    store.get('catalog').reset();
    return () => {
      store.get('description').reset();
    };
  }, [_id])

  const store = useStore();

  const select = useSelector(state => ({
    loading: state.description.loading,
    item: state.description.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={select.loading ? <h1>Загрузка...</h1> : <h1>{select.item && select.item.title}</h1>}>
      <Menu/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  )
}

export default React.memo(Description);