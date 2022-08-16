import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useContext, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "components/pagination";
import {useSearchParams} from "react-router-dom";
import {l10n} from "l10n/strings";
import {LocalisationContext} from "l10n";

function Main() {
  console.log('Main');

  const store = useStore();
  const [params, setParams] = useSearchParams();
  const {lang} = useContext(LocalisationContext);

  const heading = l10n.title[lang];
  const skip = params.get("skip") || 0;
  const limit = 10;
  const initPage = (skip / limit) + 1 || 1;

  useEffect(() => {
    store.get('catalog').load(skip, limit, lang);
  }, [params, lang]);

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const lastPage = Math.ceil((select.count / limit));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Клик по странице пагинации
    onPageClick: useCallback((value) => {
      setParams({...Object.fromEntries(params.entries()), skip: String(value * limit)});
    }, []),
    // Клик на последнюю страницу
    onLastClick: useCallback(() => {
      setParams({...Object.fromEntries(params.entries()), skip: String((lastPage - 1) * limit)});
    }, [lastPage]),
    // Клик на первую страницу
    onFirstClick: useCallback(() => {
      setParams(() => {
        params.delete("skip");
      });
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  };

  return (
    <Layout head={<h1>{heading}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
        initPage={initPage}
        lastPage={lastPage}
        onFirstClick={callbacks.onFirstClick}
        onPageClick={callbacks.onPageClick}
        onLastClick={callbacks.onLastClick}/>
    </Layout>
  );
}

export default React.memo(Main);
