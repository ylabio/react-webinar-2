import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useSearchParams, useNavigate} from 'react-router-dom';
import Pagination from "../../components/pagination";
import Navbar from "../../components/navbar";
import Container from "../../components/container";


function Main(){
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;  
  const navigate = useNavigate()
  
  console.log('Main', currentPage);

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    limit: state.catalog.limit
  }));
  
  console.log(select.items)

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    getItem: useCallback(()=>{
      store.get('catalog').load()
    }, [currentPage]),
    goToPage: useCallback((currentPage)=>navigate({search:`?page=${currentPage}`}),[])
  };

  const renders = {
    item: useCallback(item => <Item item={item} path = {`product/${item._id}`} onAdd={callbacks.addToBasket}/>, []),
  }

  useEffect(()=>{
    store.get('catalog').setCurrentPage(currentPage)
    callbacks.getItem()
  }, [currentPage])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Container>
        <Navbar />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
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
