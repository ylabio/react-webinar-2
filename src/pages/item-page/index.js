import React, { useCallback, useEffect } from "react";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import FullItem from "./full-item";
import { useParams } from 'react-router-dom';
import Navbar from "../../components/navbar";
import Container from '../../components/container';


function ItemPage(){
  const {id} = useParams()
  const store = useStore()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    description: state.item.description,
  }));


  useEffect(() => {
    store.get('item').getInfo(id);
    console.log(select.description)

  }, [id]);

  
  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), [id]),
  };



  return (
    <Layout head={<h1>{select.description.title}</h1>}>
      <Container>
        <Navbar/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </Container>
      <FullItem
        description={select.description}
        addToBasket = {callbacks.addToBasket}
      />
    </Layout>
  )
}

export default React.memo(ItemPage);
