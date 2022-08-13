import React, {useEffect, useCallback} from "react";
import {useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import ProductDesc from "../../components/product-desc";

function Product() {

  console.log('Product');

  const store = useStore();
  let { productNumber } = useParams();
  productNumber = Number(productNumber);

  useEffect(() => {
    store.get('product').loadProduct(productNumber);
    return () => {
      store.get('product').clearProduct();
    };
  }, [productNumber, store])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    isProductLoaded: state.product.isDataLoaded
  }));

  const product = useSelector(state => ({
    _id: state.product.item._id,
    description: state.product.item.description,
    edition: state.product.item.edition,
    madeIn: state.product.madeIn,
    madeInCode: state.product.madeInCode,
    category: state.product.category,
    price: state.product.item.price,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>Название товара</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.isProductLoaded && <ProductDesc product={product} onAdd={callbacks.addToBasket} />}
    </Layout>
  )
}

export default React.memo(Product);
