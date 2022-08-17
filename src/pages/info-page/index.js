import React, { useCallback, useEffect } from "react";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Product from "./product";
import { useParams } from 'react-router-dom';
import Navigation from "../../components/navigation";
import Container from "../../components/container";

function PageInfo() {
  const { id } = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    info: state.product.info,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), [id]),
  };

  useEffect(() => {
    store.get('product').getInfo(id);
  }, [id]);

  return (
    <Layout head={<h1>{select.info.title}</h1>}>
      <Container>
        <Navigation />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Container>
      <Product info={select.info} addToBasket={callbacks.addToBasket} />
    </Layout>
  )
}

export default React.memo(PageInfo);
