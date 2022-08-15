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

function Main(){

  const store = useStore();
  const page = useParams().page;
  const navigate = useNavigate();
  const translation = useTranslation();

  useEffect(() => {
    if ( !page ) {
      navigate("/1");
      store.get('catalog').load();   
    } else store.get('catalog').load(+page);
  }, [page])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  })); 

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Запрашиваем новую страницу
    loadPage: useCallback(page => store.get('catalog').load(page), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>{translation.main.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination loadPage={callbacks.loadPage}/>
    </Layout>
  )
}

export default React.memo(Main);
