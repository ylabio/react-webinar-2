import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useState} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pages from "../../components/pages";
import Menu from "../../components/menu";
import {Link} from "react-router-dom";

function Main(){

  console.log('Main');
  const store = useStore();
  const catalog = store.get('catalog');

  const select = useSelector(state => ({
    itemsCount: state.catalog.itemsCount,
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activePage: state.catalog.activePage,
    query: state.catalog.query
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  return (    
    <Layout head={<h1>Магазин</h1>} 
    nav={<Pages state={select}
    catalog={catalog} 
    count={Math.ceil(select.itemsCount/select.query.limit)} 
      />}>
      <Menu>
        <Link to='/' onClick={()=>catalog.setActive(0)}>Главная</Link>
      </Menu> 
      <BasketSimple onOpen={callbacks.openModalBasket} 
      amount={select.amount} 
      sum={select.sum} />
    </Layout>
  )
}

export default React.memo(Main);
