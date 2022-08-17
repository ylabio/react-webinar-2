import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useParams } from 'react-router-dom';
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemDescription from "../../components/item-description";
import Sidebar from "../../components/sidebar";
import { object } from "prop-types";


function Description(){

  console.log('Description');

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.get('description').loadById(id);
  }, [id])

  const select = useSelector(state => ({
    item: state.description.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  if(store.state.catalog.items.length === 0) {
        
  }

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <Sidebar onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  )
}

export default React.memo(Description);
