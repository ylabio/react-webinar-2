import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Translate from "../../components/translate";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(select.page, select.limit);
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.page,
    pages: state.catalog.pages,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.languages,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение страницы пагинации
    selectPage: useCallback((skip) => store.get('catalog').load(skip, select.limit), []),
    // Переводы
    translateRu: useCallback(() => store.get('languages').translateRu(), []),
    translateEn: useCallback(() => store.get('languages').translateEn(), []),
  };

  const renders = {
    item: useCallback(item =>
      <Item lang={select.lang}
            item={item}
            onAdd={callbacks.addToBasket}
      />, [select.lang]),
  }

  return (
    <Layout head={
      <>
        <h1>{select.lang.store}</h1>
        <Translate translateRu={callbacks.translateRu}
                   translateEn={callbacks.translateEn}
                   lang={select.lang}
        />
      </>
    }>
      <BasketSimple lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination selectPage={callbacks.selectPage}
                  currentPage={select.page}
                  allPages={select.pages}
      />
    </Layout>
  )
}

export default React.memo(Main);
