import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ProductPage from "../../components/product-page";
import Wrapper from "../../components/wrapper";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Menu from "../../components/menu";
import {useParams} from "react-router-dom"
import NotFound from "../../components/not-found";


function Product() {
  const store = useStore();

  const {id} = useParams();

  useEffect(() => {
    store.get('product').load(id);
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.product.item
  }));
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>Товар</h1>}>
      
      <Wrapper>
        <Menu/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Wrapper>
      {select.item ? 
        <ProductPage onAdd={callbacks.addToBasket} item={select.item}/> : <NotFound/>
      }
    </Layout>
  )
}

export default Product;