import React, { useCallback, useEffect, useState } from "react";

import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination/index"
import { GridLoader } from "react-spinners";




function Main() {


  const store = useStore();
  const [numPege, setNumPege] = useState(0)
  const count = Math.ceil(store.state.catalog.count * 0.1)


  console.log('Main')

  useEffect(() => {
    store.get('catalog').load(numPege * 10, 10)
  }, [numPege])

  const select = useSelector(state => ({
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

          <Layout head={<h1>Магазин</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            <List items={select.items} renderItem={renders.item} />
            {(store.state.catalog.items.length > 0)
              ? <Pagination {...{numPege , setNumPege , count }} />
              : <GridLoader />}
          </Layout>
      
  )
}

export default React.memo(Main);
