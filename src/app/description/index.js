import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router";
import Product from "../../components/product";
import Navigation from "../../components/navigation";

function Description() {

  const store = useStore();
  const {id} = useParams()

  useEffect(() => {
    store.get('description').load(id);
  }, [id])

  const select = useSelector(state => ({
    product: state.description.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
  }));


  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), []),
  };

  return (
    <Layout head={<h1>{select.product.title}</h1>}>
      <Navigation page={select.page}/>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}
      />
      <Product product={select.product} onAdd={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(Description);
