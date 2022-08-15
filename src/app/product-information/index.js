import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ProductCard from "../../components/product-card";

function ProductInformation() {
  
  console.log('ProductInformation');
  
  const store = useStore();
  
  const select = useSelector(state => ({
    id: state.product.id,
    title: state.product.title,
    description: state.product.description,
    country: state.product.country,
    category: state.product.category,
    year: state.product.year,
    price: state.product.price,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Получение данных о выбранном товаре
    getProductInformation: useCallback(() => store.get('product').getProductInformation(), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ProductCard
        id={select.id}
        description={select.description}
        country={select.country}
        category={select.category}
        year={select.year}
        price={select.price}
        addToBasket={callbacks.addToBasket}
      />
    </Layout>
  )
}

export default React.memo(ProductInformation);
