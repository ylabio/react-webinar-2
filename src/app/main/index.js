import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasketSimple from "../../components/basket-simple";
import Item from "../../components/item";
import Layout from "../../components/layout";
import List from "../../components/list";
import Paginator from "../../components/paginator";
import useLanguage from "../../utils/use-language";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";

function Main(){

  console.log('Main');

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    items: state.catalog.items,
    scope: state.catalog.scope,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const lng = useLanguage();

  // перезагружаемся, если изменили страницу или число итемов на странице
  useEffect(() => {
    //store.get('catalog').load();
    store.get('catalog').loadScope(select.scope.current);
    // костыль, чтоб не прыгал пагинатор из-за перерисовки листа
    document.getElementsByClassName('List')[0].style.height = select.scope.maxItems * 62 + "px";
  }, [select.scope.current, select.scope.maxItems])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение страницы
    switchPage: useCallback(selected => {store.get('catalog').setCurrentScope(selected)}, []),
    // Подробности о товаре
    showDetails: useCallback(id => navigate(`details/${id}`), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} onTitleClick={callbacks.showDetails}/>, []),
  }

  return (
    
    <Layout head={<h1>{lng("mainLabel")}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Paginator props={{...select.scope, onClick: callbacks.switchPage}}/>
    </Layout>
  )
}

export default React.memo(Main);