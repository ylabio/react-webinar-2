import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Description from "../../components/description";
import {
  Routes,
  Route,
  useParams
} from "react-router-dom";
import Pages from "../../components/pages";

function Main(){

  console.log('Main');
  const store = useStore();
  const [itemsPerPage] = useState(10);
  
  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    itemsCount: state.catalog.itemsCount,
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  }

  return (
        <Routes>
          <Route path ="/" element={
            <Layout head={<h1>Магазин</h1>} 
                    nav={<Pages count={Math.ceil(select.itemsCount/itemsPerPage)} 
                    perPage={itemsPerPage} />}>
            <BasketSimple onOpen={callbacks.openModalBasket} 
                          amount={select.amount} 
                          sum={select.sum}/>
            </Layout>}>
            <Route index element={<List items={select.items} renderItem={renders.item}/>} />
            <Route path=":query" element={<List items={select.items} renderItem={renders.item}/>} />
          </Route>
          <Route path="/articles/:id" 
                 element={<Layout head={<h1>Название товара</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} 
                          amount={select.amount} 
                          sum={select.sum}/>
            <Description onAdd={callbacks.addToBasket} />
            </Layout>} />
        </Routes>
  )
}

export default React.memo(Main);
