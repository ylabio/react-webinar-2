import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useContext, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";
import {useNavigate, useParams} from "react-router-dom";
import skip from "../../utils/skip";
import Navigation from "../../components/navigation";

function Main(){

  console.log('Main');

  const store = useStore();
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const select = useSelector(state => ({
    items: state.catalog.items,
    total: state.catalog.total,
    amount: state.basket.amount,
    sum: state.basket.sum,
    current: state.pagination.current,
    limit: state.pagination.limit,
  }));

  const {page} = useParams();
  const currentPage = page ? parseInt(page, 10) : select.current;

  useEffect(() => {
    store.get('catalog').load(skip(currentPage, select.limit), select.limit);
  }, [select.current]);

  useEffect(() => {
    // Для сохранения страницы при следующей последовательности действий:
    // 1) Обновить каталог при нахождении не на первой странице
    // 2) Перейти на карточку товара
    // 3) Перейти по ссылке "Главная" в каталог
    // Иначе сброс не первую страницу
    if (select.current === 1) {
      store.get('pagination').changePage(currentPage, 10);
    }
  }, []);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
    changePage: useCallback(page => {
      navigate(`/catalog/${page}`, { replace: true });
      store.get('pagination').changePage(page);
    }, []),
    onHomeClick:  useCallback(evt => {
      evt.preventDefault();
      navigate(`/catalog/${currentPage}`, { replace: true });
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>{Translation[language].main.title}</h1>}>
      <Navigation onClick={callbacks.onHomeClick}/>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}/>
      {select.items.length ?
      <>
        <List items={select.items} renderItem={renders.item}/>
        <Pagination itemsNumber={select.total}
                    currentPage={currentPage}
                    itemsPerPage={select.limit}
                    onChange={callbacks.changePage} />
      </> : <Loader />}
    </Layout>
  )
}

export default React.memo(Main);
