import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemProduct from "../../components/item-product";

function Product(){

  const { id } = useParams()

  const store = useStore();

  useEffect(() => {
    store.get('catalog').getProduct(id);
    return () => store.get('catalog').removeProduct();
  }, [id, store])

  const select = useSelector(state => ({
    product: state.catalog.product,
    isError: state.catalog.isError,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  console.log("product: ", select.product);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Запрашиваем новую страницу
    loadPage: useCallback(page => store.get('catalog').load(page), []),
  };

  // const renders = {
  //   item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  // }

  if (select.isError) return <h1>{select.isError}</h1>

  return (
    <Layout head={<h1>{select.product?.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      { 
        !select.product 
        ? <h1>Loading...</h1>
        : <ItemProduct product={select.product} onAdd={callbacks.addToBasket}/>
      }
    </Layout>
  )
}

export default React.memo(Product);
