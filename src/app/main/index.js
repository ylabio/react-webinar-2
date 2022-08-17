import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import useTranslation from "../../utils/use-translation";
import Nav from "../../components/nav";

function Main(){

  const store = useStore();
  const page = useParams().page;
  const navigate = useNavigate();
  const translationMain = useTranslation('main');

  useEffect(() => {
    if ( !page ) {
      navigate("/1");
      store.get('catalog').load();   
    } else store.get('catalog').load(+page);
  }, [page])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    locale: state.app.locale,
  })); 

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Запрашиваем новую страницу
    loadPage: useCallback(page => store.get('catalog').load(page), []),
    // перейти на страницу товара
    viewProduct: useCallback((id) => navigate(`/product/${id}`), []),
    // Смена языка интерфейса
    changeLocaleHandler: useCallback((value) => store.get('app').changeLocale(value), []),
    translationMain: useCallback(translationMain, [select.locale]),
  };

  const renders = {
    item: useCallback(item => <Item item={item}
                                    viewProduct={callbacks.viewProduct}
                                    onAdd={callbacks.addToBasket}
                                    translation={callbacks.translationMain}/>, []),
  }

  return (
    <Layout head={<h1>{callbacks.translationMain("title")}</h1>}
            locale={select.locale}
            changeLocaleHandler={callbacks.changeLocaleHandler}>

      <Nav translation={callbacks.translationMain}/>
      <BasketSimple translation={callbacks.translationMain} 
                    onOpen={callbacks.openModalBasket} 
                    amount={select.amount} 
                    sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination loadPage={callbacks.loadPage}/>

    </Layout>
  )
}

export default React.memo(Main);
