import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router-dom";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import './style.css';

function Main(){
  
  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    skipPage: state.pages.skip,
    page: state.pages.page,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  
  //получаем номер страницы при переходе
  const param = useParams();
  let pageParam = select.page;
  if (param.page)
    pageParam = Number(param.page);  
  
  useEffect(() => {
    store.get('pages').setPage(pageParam);
  }, [pageParam])
 
  useEffect(() => {
    store.get('catalog').load(select.skipPage);
  }, [select.skipPage])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Открытие описания товара
    openModalArticle: useCallback((_id) => store.get('article').setId(_id), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена страницы
    setPage: useCallback(page => store.get('pages').setPage(page), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} openArticle={callbacks.openModalArticle} />, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <div className='list-container'>
        <List items={select.items} renderItem={renders.item}/>
      </div>
      <Pagination page={select.page} count={select.count}/>
    </Layout>
  )
}

export default React.memo(Main);
