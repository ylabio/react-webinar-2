import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import { useNavigate, useSearchParams  } from "react-router-dom";
import Navigation from "../../components/navigation";
import './style.css';
import Container from "../../components/container";
import SelectLang from "../../components/select-lang";
import { Translate, useTranslation } from "../../utils/translate";

function Main(){
  const [searchParams] = useSearchParams();
  const currentPage = +searchParams.get('page') || 1;

  const [ t, setLocale ] = useTranslation();

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    limit: state.catalog.limit,
  }));

  const navigate = useNavigate();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

    getItem: useCallback(() => {
      store.get('catalog').load();
    }, [currentPage]),

    goToPage: useCallback((currentPage) => {
      navigate({search: `?page=${currentPage}`});
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item t={t} item={item} path={`product/${item._id}`} onAdd={callbacks.addToBasket}/>, [t]),
  }

  useEffect(() => {
    store.get('catalog').setCurrentPage(currentPage);
    callbacks.getItem();
  }, [currentPage])

  return (
    <Layout head={<Container><h1>{t('store')}</h1><SelectLang onChange={setLocale} /></Container>}>
        <Container>
          <Navigation t={t} />
          <BasketSimple t={t} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </Container>
        <List items={select.items} renderItem={renders.item} />
        <Pagination
          currentPage={currentPage}
          totalCount={select.count}
          limit={select.limit}
          onPageChange={callbacks.goToPage}
        />
    </Layout>
  )
}

export default React.memo(Main);
