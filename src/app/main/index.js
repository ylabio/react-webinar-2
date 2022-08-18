import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Header from "../../components/header";
import LanguageMenu from "../../components/language-menu";

function Main(){
  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').getCount();
  }, []);

  const select = useSelector(state => ({
    languages: state.locales.languages,
    language: state.locales.language,
    skip: state.catalog.skip,
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Сдвиг пагинации
    setSkip: useCallback(skip => store.get('catalog').setSkip(skip), []),
    selectLanguage: useCallback(language => store.get('locales').selectLanguage(language), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} link={`/articles/${item._id}`} onAdd={callbacks.addToBasket} language={select.language}/>, [select.language]),
  }

  useEffect(() => {
    store.get('catalog').getArticles(select.skip);
  }, [select.skip]);

  return (
    <Layout head={
      <Header language={select.language}>
        <LanguageMenu languages={select.languages} selectLanguage={callbacks.selectLanguage}/>
      </Header>
    }>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
      <List items={select.items} renderItem={renders.item} language={select.language}/>
      <Pagination count={select.count} skip={select.skip} setSkip={callbacks.setSkip}/>
    </Layout>
  )
}

export default React.memo(Main);
