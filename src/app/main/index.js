import Controls from "components/controls";
import Loading from "components/loading";
import {useNavigate} from "react-router-dom";
import Pagination from "src/components/pagination";
import useLanguage from "utils/use-language";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {

  console.log('Main');

  const store = useStore();

  const translation = useLanguage();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    items: state.catalog.items,
    isLoading: state.catalog.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage: state.catalog.page,
    contentPerPage: state.catalog.contentPerPage,
    language: state.language.language,
  }));

  const skip = select.currentPage * select.contentPerPage - select.contentPerPage

  useEffect(() => {
    store.get('catalog').loadProducts(skip);
  }, [select.contentPerPage, select.currentPage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //сохранение текущей страницы
    setCurrentPage: useCallback(page => store.get('catalog').setPage(page), []),
    //навигация на катру товара
    onPageProduct: useCallback(id => navigate(`/${id}`), []),
    translation: useCallback((text) => translation(text), [select.language]),
  };

  const renders = {
    item: useCallback(item => {
      return <Item item={item} onAdd={callbacks.addToBasket}
                   onName={() => callbacks.onPageProduct(item._id)}/>
    }, []),
  };

  return (
    <Layout head={<h1>{translation('shop')}</h1>}>
      <Controls amount={select.amount} sum={select.sum}
                onOpen={callbacks.openModalBasket} translation={callbacks.translation}/>
      {select.isLoading ? <Loading/> :
        <List items={select.items} renderItem={renders.item}/>}
      <Pagination count={select.count} setCurrentPage={callbacks.setCurrentPage}
                  currentPage={select.currentPage}/>
    </Layout>
  );
}

export default React.memo(Main);
