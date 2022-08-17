
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useContext, useState } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ListAndPagination from "../../components/list-pagination";
import { ContextTitle } from './../../store/contextTitle';
import Loading from "../../components/loading/loading";

function Main() {
  const { title, itemsSkipPages } = useContext(ContextTitle)
  const [selectedNumber, setSelectedNumber] = useState(0)
  const [lengthItemsPag, setLengthItemsPag] = useState(0)
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lengthItems: state.catalog.lengthItems,
    cuurentItem: state.catalog.cuurentItem,
  }));
  const store = useStore();
  useEffect(() => {
    fetch(`/api/v1/articles?limit=*&skip=*&fields=items(*),count`)
      .then((response) => response.json())
      .then((count) => setLengthItemsPag(count.result.count))

    store.get('catalog').getItems(0, itemsSkipPages)
  }, [])


  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    getItemById: useCallback(id => store.get('catalog').getItemById(id), []),
    getItemsPagination: useCallback((nextList, selectedNum, itemsSkipPages) => {
      store.get('catalog').getItems(nextList, itemsSkipPages)
      setSelectedNumber(selectedNum)
    }, []),
    cuurentItemDefaultValue: useCallback(() => store.get('catalog').cuurentItemDefaultValue(), []),

    getItems: useCallback((nextList) => {
      store.get('catalog').getItems(nextList)
    }, [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  }
  return select.items.length > 0 ? (<>

    <Layout head={<h1>{title}</h1>}>
      <BasketSimple

        cuurentItemDefaultValue={callbacks.cuurentItemDefaultValue}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ListAndPagination
        items={select.items}
        renderItem={renders.item}
        lengthItems={lengthItemsPag}
        getItems={callbacks.getItemsPagination}
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
      />
    </Layout>
  </>

  ) : <Loading />

}

export default React.memo(Main);
