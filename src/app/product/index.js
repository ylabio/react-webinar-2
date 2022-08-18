import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemProduct from "../../components/item-product";
import useTranslation from "../../utils/use-translation";
import Nav from "../../components/nav";

function Product(){

  const { id } = useParams()

  const store = useStore();
  const translationMain = useTranslation('main');
  const translationProduct = useTranslation('product');

  useEffect(() => {
    store.get('product').getProduct(id);
    return () => store.get('product').removeProduct();
  }, [id])

  const select = useSelector(state => ({
    product: state.product.product,
    isError: state.product.isError,
    amount: state.basket.amount,
    sum: state.basket.sum,
    locale: state.app.locale,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена языка интерфейса
    changeLocaleHandler: useCallback((value) => store.get('app').changeLocale(value), []),
    translationMain: useCallback(translationMain, [select.locale]),
    translationProduct: useCallback(translationProduct, [select.locale]),
  };

  if (select.isError) return <h1>{select.isError}</h1>

  return (
    <Layout head={<h1>{select.product?.title}</h1>}
            locale={select.locale}
            changeLocaleHandler={callbacks.changeLocaleHandler}>
      <Nav translation={callbacks.translationMain}/>
      <BasketSimple translation={callbacks.translationMain} 
                    onOpen={callbacks.openModalBasket} 
                    amount={select.amount} 
                    sum={select.sum}/>
      { 
        !select.product 
        ? <h1 style={{textAlign: "center", width: "100%"}}>Loading...</h1>
        : <ItemProduct product={select.product} 
                       onAdd={callbacks.addToBasket} 
                       translation={callbacks.translationProduct}/>
      }
    </Layout>
  )
}

export default React.memo(Product);
