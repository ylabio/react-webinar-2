import React, { useCallback, useEffect } from "react";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Product from "./product";
import { useParams } from 'react-router-dom';
import Navigation from "../../components/navigation";

function PageInfo() {
  const { id } = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.product.info.title,
    description: state.product.info.description,
    edition: state.product.info.edition,
    category: state.product.info.category.title,
    maidIn: {
      title: state.product.info.maidIn.title,
      code: state.product.info.maidIn.code,
    },
    price: state.product.info.price,

  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), [id]),
  };

  useEffect(() => {
    store.get('product').getInfo(id);
  }, [id]);

  return (
    <Layout head={<h1>{select.title}</h1>}>
      <div className='Main-container'>
        <Navigation />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </div>
      <Product
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

export default React.memo(PageInfo);
