import React, { useCallback, useEffect } from "react";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import SingleItem from "../../components/single-item";
import { useParams } from 'react-router-dom';

function ItemPage(){
  const {id} = useParams()
  const store = useStore()

  const select = useSelector(state => ({
    title: state.catalog.productInfo.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
    description: state.catalog.productInfo.description,
    edition: state.catalog.productInfo.edition,
    category: state.catalog.productInfo.category.title,
    maidIn: {
      title: state.catalog.productInfo.maidIn.title,
      code: state.catalog.productInfo.maidIn.code,
    },
    price: state.catalog.productInfo.price,
  }));

  useEffect(() => {
    store.get('catalog').getInfo(id);
  }, [id]);

  
  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), []),
  };



  return (
    <Layout head={<h1>{select.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <SingleItem
        description={select.description}
        edition={select.edition}
        category={select.category}
        maidIn={select.maidIn}
        price={select.price}
        addToBasket={callbacks.addToBasket}
      />
    </Layout>
  )
}

export default React.memo(ItemPage);
