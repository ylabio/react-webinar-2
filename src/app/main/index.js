import BasketSimple from "../../components/basket-simple";
import NavMenu from "../../components/nav-menu";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from '../../components/pagination';

//Второй вариант хранения заголовков меню
// import navigation from '../../navigation.json';

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    pagesCount: state.catalog.pagesCount,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    menuItems: state.navigation.menuItems
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //Пагинация
    onClickPage: useCallback((currentPage) => store.get('catalog').load(currentPage), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} onLink={`item/${item._id}`}/>, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      {/* Второй вариант хранения заголовков меню */}
      {/* <NavMenu menuItems={navigation.menuItems}/> */}
      <NavMenu menuItems={select.menuItems}/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination pagesCount={select.pagesCount}                  
                  onPage={callbacks.onClickPage}
                  currentPage={select.currentPage}
                  />
    </Layout>
  )
}

export default React.memo(Main);
