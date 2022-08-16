import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import Language from "../../components/language";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import words from "../../utils/words";

function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    selected: state.catalog.selected,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  useEffect(() => {
    store.get('catalog').load(); 
    store.get('language').load(); 
  }, [select.limit, select.skip])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смещение выборки
    onClick: useCallback(obj => store.get('catalog').setSkip(obj), []),
    // Выбран язык
    onSelectChange: useCallback(lang => {
      localStorage.setItem('lang', lang);
      store.get('language').setLang(lang);
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} words={words[select.lang]} onAdd={callbacks.addToBasket}/>, [select.lang]),
  }
  return (
    <Layout head={
      <>
        <h1>{words[select.lang].title}</h1>
        <Language lang={select.lang} onSelectChange={callbacks.onSelectChange} />
      </>
    }>
      <BasketSimple words={words[select.lang]} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.count ? 
        <>
          <List items={select.items} renderItem={renders.item}/>
          <Pagination limit={select.limit} count={select.count} selected={select.selected} onClick={callbacks.onClick}/>
        </> : 
        <h2 style={{textAlign: 'center'}}>Loading...</h2>
      }
    </Layout>
  )
}

export default React.memo(Main);
