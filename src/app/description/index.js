import React, {useCallback, useEffect} from 'react';
import Layout from '../../components/layout';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import BasketSimple from '../../components/basket-simple';
import { useParams } from 'react-router-dom';
import DiscriptionContent from '../../components/discription-content';
import Loader from '../../components/loader';
import Menu from "../../components/main-menu";

function Descriptions() {

  
  console.log('Descriptions');
  const store = useStore();
  
  const select = useSelector(state => ({
      name: state.product.name,
      description:state.product.description,
      madeIn: state.product.madeIn,
      madeInCode: state.product.madeInCode,
      category: state.product.category,
      edition: state.product.edition,
      price: state.product.price,
      amount: state.basket.amount,
      sum: state.basket.sum,
      loaded:state.product.loaded
  }));
  const id=useParams().id

  useEffect(() => {
    store.get('product').loadItem(id)
  },[id])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Cмена языка
    changeLang: useCallback((lang) => store.get('lang').changeLang(lang), []),
    
  };
  return (
    <>
    <Layout head={<h1>{select.name}</h1>} ChangeLang={callbacks.changeLang}>
      <Menu link='/'/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <DiscriptionContent id={id} select={select} changeLang={callbacks.changeLang} 
      addToBasket={callbacks.addToBasket} />
    </Layout>
    {!select.loaded?<Loader/>:''}
    </>
  )
}

export default React.memo(Descriptions);
