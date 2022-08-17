import React, {useCallback, useEffect} from "react";
import {useParams} from 'react-router-dom';
import BasketSimple from "../../components/basket-simple";
import NavMenu from "../../components/nav-menu";
import Layout from "../../components/layout";
import ItemInfo from "../../components/item-info";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

//Второй вариант хранения заголовков меню
// import navigation from '../../navigation.json';

function ItemPage() {
  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.get('item').load(id);
    store.get('modals').close();
  }, [id])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item,
    menuItems: state.navigation.menuItems
  }));

  const callbacks = {
    // Открытие и закрытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      {/* Второй вариант хранения заголовков меню */}
      {/* <NavMenu menuItems={navigation.menuItems}/> */}
      <NavMenu menuItems={select.menuItems}/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemInfo item={select.item} onAdd={callbacks.addToBasket}/>
    </Layout>
  );
}

export default React.memo(ItemPage);