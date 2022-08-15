import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination";
import LoadingScreen from '../../components/loading-screen';

function Main(){

  console.log('Main');

  const store = useStore();
  const params = useParams();

  const loadingScreen = useSelector(state => state.loadingScreen.status);

  useEffect(() => {
    if(params.pageNumber){ 
      store.get('catalog').loadPage(params.pageNumber , callbacks.openLoadingScreen , callbacks.closeLoadingScreen)
    }else{
      store.get('catalog').load(callbacks.openLoadingScreen , callbacks.closeLoadingScreen); 
    }
  }, [params])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Открытие экрана закрузки
    openLoadingScreen: useCallback(() => store.get('loadingScreen').open(), []),
    // Закрытие экрана закрузки
    closeLoadingScreen: useCallback(() => store.get('loadingScreen').close(), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <>
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination />
    </Layout>
    {loadingScreen  && <LoadingScreen/>}
    </>
  )
}

export default React.memo(Main);
