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
import MultiLang from "../../components/multiLang";

function Main() {
  console.log('Main');

  const contentPerPage = 10;
  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoaded: state.params.isLoaded,
    count: state.catalog.count,
    lang: state.params.lang,
    limit: state.catalog.limit,
    skip: state.catalog.limit
  }));

  const {
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage,
    count: select.count
  });

  useEffect(() => {
    store.get('catalog').setLoadOptions({ limit: contentPerPage, skip: (page - 1) * contentPerPage })
    store.get('catalog').load();
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход на страницу по пагинации
    onClick: useCallback(async (page) => {
      setPage(page);
      store.get('catalog').setLoadOptions({ skip: (page - 1) * select.limit })
      await store.get('catalog').load({ limit: select.limit, skip: select.skip });
    }, [page, select.count, select.limit]),
    // Установить язык страницы
    setLang: useCallback((l) => store.get('params').setLang(l), [select.lang])
  };

  const menuText = translate(dMenu),
    basketSimpleText = translate(dBasketSimple),
    layoutText = translate(dLayout),
    itemText = translate(dItem);

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} linkTo={"/item"} text={itemText} />, [select.lang]),
    head: <>
      <h1>
        {select.isLoaded ? layoutText.title : "Loading..."}
        <MultiLang langArr={["RU", "ENG"]} setLang={callbacks.setLang} />
      </h1>
    </>
  }

  return (
    <Layout head={renders.head}>
      <Menu text={menuText} />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} text={basketSimpleText} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination page={page} gaps={gaps} totalPages={totalPages} onClick={callbacks.onClick} />
    </Layout>
  )
}

export default React.memo(Main);
