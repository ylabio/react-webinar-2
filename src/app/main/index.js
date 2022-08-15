import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import Pages from "../../components/pages";
import Language from "../../components/language";
import TextField from "../../components/text-field";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import titleLang from "../../utils/titleLang";

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
    // Ограничение количества
    onChange: useCallback(num => num && store.get('catalog').setLimit(num), []),
    // Выбран язык
    onSelectChange: useCallback(lang => {
      localStorage.setItem('lang', lang);
      store.get('language').setLang(lang);
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} lang={select.lang} onAdd={callbacks.addToBasket}/>, [select.lang]),
  }
  return (
    <Layout head={
      <>
        <h1>{titleLang(select.lang, 'title')}</h1>
        <Language lang={select.lang} onSelectChange={callbacks.onSelectChange} />
      </>
    }>
      <BasketSimple lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.count ? 
        <>
          <List items={select.items} renderItem={renders.item}/>
          <TextField lang={select.lang} limit={select.limit} count={select.count} onChange={callbacks.onChange} />
          <Pages limit={select.limit} count={select.count} selected={select.selected} onClick={callbacks.onClick}/>
        </> : 
        <h2 style={{textAlign: 'center'}}>Loading...</h2>
      }
    </Layout>
  )
}

export default React.memo(Main);
