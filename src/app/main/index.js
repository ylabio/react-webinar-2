import {useParams} from "react-router-dom";
import Pagination from "../../components/pagination";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Language from "../../components/language";
import Navigation from "../../components/navigation";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {appRoute, textBasketSimple, textItem, textNavigation, productsPerPage} from "../../const";

function Main() {
  console.log('Main');

  const store = useStore();
  let { pageNumber } = useParams();
  pageNumber = Number(pageNumber);

  useEffect(() => {
    store.get('catalog').loadPreviews(pageNumber);
  }, [pageNumber])
  
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    catalogSize: state.catalog.size,
    language: state.language.value,
  }));
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение языка
    toggleLanguage: useCallback(() => store.get('language').toggleLanguage(), []),
  };

  const renders = {
    item: useCallback(item =>
      <Item
        item={item}
        onAdd={callbacks.addToBasket}
        address={appRoute.Product}
        text={{add: textItem.add[select.language]}}
      />, [{add: textItem.add[select.language]}]),
  }

  return (
    <Layout
      head={<>
        <h1>{select.language === 'rus' ? 'Магазин' : 'Shop'}</h1>
        <Language onToggle={callbacks.toggleLanguage} lang={select.language} />
      </>}
    >
      <Navigation text={{main: textNavigation.main[select.language]}} />
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        text={{
          inCart: textBasketSimple.inCart[select.language],
          itemsPlural: textBasketSimple.itemsPlural[select.language],
          empty: textBasketSimple.empty[select.language],
          enter: textBasketSimple.enter[select.language],
        }}
      />
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
        amount={Math.round(select.catalogSize / productsPerPage)}
        pageNumber={pageNumber || 1}
      />
    </Layout>
  )
}

export default React.memo(Main);
