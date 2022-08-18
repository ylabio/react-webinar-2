import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import PaginationMain from "../../components/pagination-main";
import { Link } from "react-router-dom";
import Menu from "../../components/menu";

function Main(){

  console.log('Main');
  
  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    count: state.catalog.count,
    items: state.catalog.items,
    itemsPerPage: state.catalog.itemsPerPage,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  const [minPageNumberLimit, setMinPageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4);
  const quantityPages = Math.ceil(select.count / select.itemsPerPage);


  if (select.currentPage === minPageNumberLimit + 2 && !(select.currentPage === quantityPages - 1)) {
    setMinPageNumberLimit(minPageNumberLimit + 1);
    setMaxPageNumberLimit(maxPageNumberLimit + 1)
  }

  if (select.currentPage === minPageNumberLimit && !(select.currentPage === 2)) {
    setMinPageNumberLimit(minPageNumberLimit - 1);
    setMaxPageNumberLimit(maxPageNumberLimit - 1)
  }

  const paginate = (pageNumber) => {
    store.get('catalog').load(pageNumber);
    if (pageNumber === 1) {
      setMinPageNumberLimit(2);
      setMaxPageNumberLimit(4)
    }
    if (pageNumber === quantityPages) {
      setMinPageNumberLimit(quantityPages - 3);
      setMaxPageNumberLimit(quantityPages - 1)
    }
  }

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Изменение языка интерфейса
    changeLanguage: useCallback((e) => store.get('language').getLanguage(e.target.value), [select.lang]),
    translate: useCallback((code) => store.get('language').getTranslate(code, select.lang), [select.lang])
  };

  const renders = {
    item: useCallback(item => <Item 
      item={item} 
      onAdd={callbacks.addToBasket} 
      translate={callbacks.translate} 
      link={`article/${item._id}`}
    />, [select.lang]),
  }
  
  return (
    <Layout title={callbacks.translate("shop")} changeLanguage={callbacks.changeLanguage} lang={select.lang}>
      <Menu translate={callbacks.translate} />
      <BasketSimple 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        translate={callbacks.translate}
      />
      <List items={select.items} renderItem={renders.item}/>
      <PaginationMain   
        paginate={paginate} 
        currentPage={select.currentPage}
        minPageNumberLimit={minPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
        quantityPages={quantityPages}
      />
    </Layout>
  )
}

export default React.memo(Main);
