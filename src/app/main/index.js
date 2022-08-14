import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import MLText from "../../components/multi-lang/mul-lang-text";

function Main(){

  console.log('Main');

  const store = useStore();
  
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activePage: state.catalog.activePage,
    numOfPages: state.catalog.numOfPages,
    loaded:state.catalog.loaded
    
  }));
    
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Изменение активной страницы
    changePage:useCallback(nPage=>store.get('catalog').changePage(nPage),[]),
    // Cмена языка
    changeLang: useCallback((lang) => store.get('lang').changeLang(lang), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <>
    <Layout head={<h1><MLText item={'head'}/></h1>} ChangeLang={callbacks.changeLang}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination activePage={select.activePage} numOfPages={select.numOfPages} changePage={callbacks.changePage} />
    </Layout>
    {!select.loaded?<Loader/>:''}
    </>
  )
}

export default React.memo(Main);
