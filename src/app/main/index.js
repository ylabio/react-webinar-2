import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import usePagination from "../../utils/use-pagination";
import Pagination from "../../components/pagination";
import Menu from "../../components/Menu";
import { translate } from "../../utils/translate";
import { dBasketSimple, dItem, dLayout, dMenu } from "../../utils/dictionary";

function Main() {
  console.log('Main');

  const contentPerPage = 10;
  const store = useStore();

  useEffect(() => {
    store.get('catalog').load({ limit: contentPerPage });
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoaded: state.params.isLoaded,
    count: state.catalog.count,
    lang: state.params.lang
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход на страницу по пагинации
    onClick: useCallback(async (page) => {
      setPage(page);
      await store.get('catalog').load({ limit: contentPerPage, skip: (page - 1) * contentPerPage });
    }, [page, select.count]),
    // Установить язык страницы
    setLang: useCallback((l) => store.get('params').setLang(l), [select.lang])
  };

  const {
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage,
    count: select.count
  });

  const menuText = translate(dMenu),
    basketSimpleText = translate(dBasketSimple),
    layoutText = translate(dLayout),
    itemText = translate(dItem);

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} linkTo={"/item"} text={itemText} />, [select.lang]),
  }

  return (
    <Layout head={<h1>{select.isLoaded ? layoutText.title : "Loading..."}</h1>}>
      <Menu setLang={callbacks.setLang} text={menuText} />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} text={basketSimpleText} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination page={page} gaps={gaps} totalPages={totalPages} onClick={callbacks.onClick} />
    </Layout>
  )
}

export default React.memo(Main);
