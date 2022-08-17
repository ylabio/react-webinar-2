import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useMemo} from "react";
import Item from "../../components/item";
import Menu from "../../components/menu";
import Pagination from "../../components/pagination";
import Wrapper from "../../components/wrapper";
import Head from "../../components/head";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Loader from "../../components/loader";
import translate from "../../utils/translate";
import allCodes from "../../utils/translate/codes";


function Main(){

  console.log('Main');

  // коды для мультиязычности которые передаются через пропсы для глупых компонентов
  const codes = useMemo(() => JSON.parse(JSON.stringify(allCodes)), []);

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    limitPerPage: state.catalog.limitPerPage,
    isLoading: state.catalog.isLoading,

    language: state.localization.language
  }));

  useEffect(() => {
    store.get('catalog').load(select.currentPage);
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    changeNumberPage: useCallback(numberPage => store.get('catalog').load(numberPage), []),
    // Смена языка сайта
    changeLanguage: useCallback(language => store.get('localization').changeLanguage(language), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} language={select.language} link={`/singlepage/${item._id}`} translate={translate} codesItem={codes.item}/>, [select.language]),
  }

  return (
    <Layout head={<Head language={select.language} changeLanguage={callbacks.changeLanguage} title={translate(select.language, codes.titles.CODE_18)} translate={translate} codesHead={codes.head}/>}>
      <Wrapper>
        <Menu language={select.language} translate={translate} codesMenu={codes.menu}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language} translate={translate} codesBasketSimple={codes.basketSimple}/>
      </Wrapper>
      <List items={select.items} renderItem={renders.item}/>
      {select.isLoading ? <Loader/> :
      <Pagination currentPage={select.currentPage} totalPages={select.totalPages} limitPerPage={select.limitPerPage} changeNumberPage={callbacks.changeNumberPage}/>
      }
    </Layout>
  )
}

export default React.memo(Main);