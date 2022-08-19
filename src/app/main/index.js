<<<<<<< HEAD
import BasketSimple from '../../components/basket-simple'
import List from '../../components/list'
import Layout from '../../components/layout'
import React, { useCallback, useEffect } from 'react'
import Item from '../../components/item'
import useStore from '../../utils/use-store'
import useSelector from '../../utils/use-selector'
import Pagination from '../../components/pagination'
import Menu from '../../components/menu'
import HeaderWrapper from '../../components/header-wrapper'

function Main() {
  console.log('Main')

  const store = useStore()

  useEffect(() => {
    store.get('catalog').load()
  }, [])

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
    limit: state.catalog.limit,
    path: state.catalog.path,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }))

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),

    changeNumber: useCallback((skip) => store.get('catalog').load(skip), []),

    setCurrentPage: useCallback(
      (currentPage) => store.get('catalog').setCurrentPage(currentPage),
      []
    ),
  }

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} path={select.path} />,
      []
    ),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <HeaderWrapper>
        <Menu />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </HeaderWrapper>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        limit={select.limit}
        count={select.count}
        changeNumber={callbacks.changeNumber}
        currentPage={select.currentPage}
        setCurrentPage={callbacks.setCurrentPage}
      />
=======
import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
>>>>>>> 165986927b5752d444b66a1dbd69b731321bd413
    </Layout>
  )
}

export default React.memo(Main)
