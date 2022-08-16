import React, {useEffect, useCallback} from "react";
import {useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import getText from "../../utils/get-text";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import Language from "../../components/language";
import ProductDesc from "../../components/product-desc";
import Navigation from "../../components/navigation";
import {textNavigation, textBasketSimple, textProductDesc} from "../../const";

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
    title: state.product.item.title,
    isProductLoaded: state.product.isDataLoaded,
    language: state.language.value,
  }));

  const product = useSelector(state => ({
    _id: state.product.item._id,
    description: state.product.item.description,
    edition: state.product.item.edition,
    madeIn: state.product.madeIn,
    madeInCode: state.product.madeInCode,
    category: state.product.category,
    price: state.product.item.price
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение языка
    toggleLanguage: useCallback(() => store.get('language').toggleLanguage(), []),
  };

  return (
    <Layout
      head={<>
        <h1>{select.title}</h1>
        <Language onToggle={callbacks.toggleLanguage} lang={select.language} />
      </>}
    >
      <Navigation text={getText(textNavigation, select.language)} />
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        text={getText(textBasketSimple, select.language)}
      />
      {select.isProductLoaded &&
      <ProductDesc
        product={product}
        onAdd={callbacks.addToBasket}
        text={getText(textProductDesc, select.language)}
      />}
    </Layout>
  )
}

export default React.memo(Product);
