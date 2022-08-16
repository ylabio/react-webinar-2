import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Footer from "../../components/footer";
import Menu from "../../components/menu"

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])



  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    countPages:state.catalog.countPages,
  }));


  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    getItemsForPage: useCallback((skip)=>store.get('catalog').switchPage(skip),[]),
  };


  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} url={`/${item._id}`}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Menu/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item} />
      <Footer countPages={select.countPages} getItems={callbacks.getItemsForPage}/>
    </Layout>
  )
}

export default React.memo(Main);
