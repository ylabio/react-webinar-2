import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ProductPage from "../../components/product-page";
import Wrapper from "../../components/wrapper";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Menu from "../../components/menu";
import {useParams} from "react-router-dom"
import Head from "../../components/head";
import Loader from "../../components/loader";
import translate from "../../utils/translate";

function Product() {
  const store = useStore();

  const {id} = useParams();

  useEffect(() => {
    store.get('product').load(id);

    return () => {
      store.get('product').resetLoader()
    };
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,

    item: state.product.item,
    isLoading: state.product.isLoading,

    language: state.localization.language,
  }));
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена языка сайта
    changeLanguage: useCallback(language => store.get('localization').changeLanguage(language), [])
  };

  return (
    <Layout head={<Head language={select.language} changeLanguage={callbacks.changeLanguage} title={select.item.title}/>}>
      <Wrapper>
        <Menu language={select.language} translate={translate}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language} translate={translate}/>
      </Wrapper>
      {select.isLoading ? <Loader/> :
      <ProductPage onAdd={callbacks.addToBasket} product={select.item} language={select.language} translate={translate}/>
      }
    </Layout>
  )
}

export default Product;