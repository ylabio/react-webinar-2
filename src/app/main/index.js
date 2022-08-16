import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useSearchParams, useNavigate} from 'react-router-dom';
import Pagination from "../../components/pagination";

function Main(){
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;  
  const navigate = useNavigate();
  const limit = 10;

  console.log('Main', currentPage);

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count
  }));
  
  console.log(select.items)

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    getItem: useCallback(()=>{
      const skip = (currentPage-1)*limit;
      store.get('catalog').load(limit,skip)
    }, [currentPage]),
    goToPage: useCallback((currentPage)=>navigate({search:`?page=${currentPage}`}),[])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  useEffect(()=>{
    callbacks.getItem()
  }, [currentPage])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination 
        currentPage={currentPage}
        totalCount = {select.count}
        limit = {limit}
        onPageChange = {callbacks.goToPage}
        />
    </Layout>
  )
}

export default React.memo(Main);
