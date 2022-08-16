import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import {useParams} from 'react-router-dom';
import Description from "../../components/description";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Product({ item }){
  console.log('Product');

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    const idFinal = item ? item : id;

    store.get('product').load(idFinal);
    return () => store.get('product').deleteItem();
  }, [item, id])
  
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
      <BasketSimple lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.dataJson ?
        <Description lang={select.lang} item={select} onAdd={callbacks.addToBasket}/> :
        <h2 style={{textAlign: 'center'}}>Loading...</h2>
      }
    </Layout>
  )
}

export default React.memo(Product);
