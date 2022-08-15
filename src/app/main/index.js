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

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
    changePage: useCallback(page => {
      navigate(`/catalog/${page}`, { replace: true });
      store.get('pagination').changePage(page);
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>{Translation[language].main.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}
                    currentLink={`/catalog/${currentPage}`}/>
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
