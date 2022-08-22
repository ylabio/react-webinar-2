import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import {useParams} from 'react-router-dom';
import Description from "../../components/description";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import words from "../../utils/words";

function Product(){
  console.log('Product');

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.get('product').load(id);

    return () => store.get('product').deleteItem();
  }, [id])
  
  const select = useSelector(state => ({
    dataJson: state.product.dataJson,
    countryJson: state.product.countryJson,
    categoryJson: state.product.categoryJson,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => {
      store.get('modals').open('basket');
    }, []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.dataJson ? select.dataJson.title : ''}</h1>}>
      <BasketSimple words={words[select.lang]} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.dataJson ?
        <Description words={words[select.lang]} item={select} onAdd={callbacks.addToBasket}/> :
        <h2 style={{textAlign: 'center'}}>Loading...</h2>
      }
    </Layout>
  )
}

export default React.memo(Product);
