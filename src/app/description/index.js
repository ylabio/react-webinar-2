import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Layout from '../../components/layout';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import BasketSimple from '../../components/basket-simple';
import { useParams } from 'react-router-dom';
import numberFormat from '../../utils/number-format';
import MLText from '../../components/multi-lang/mul-lang-text';

function Descriptions() {

  const cn = bem('Descriptions');
  
  console.log('Descriptions');
  
  const store = useStore();

  const select = useSelector(state => ({
    items: [...state.catalog.items, ...state.basket.items,],
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  const id=useParams().id
  const item=select.items.find(n=>n._id==id)
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Cмена языка
    changeLang: useCallback((lang) => store.get('lang').changeLang(lang), []),
  };
  return (
    <Layout head={<h1>{item.title}</h1>} ChangeLang={callbacks.changeLang}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <div className={cn('content')}>
      <div className={cn('description')}>{item.description}</div>
      <div><MLText item='made'/>: <span className={cn('post')}>{item.maidIn.title} ({item.maidIn.code})</span></div>
      <div><MLText item='type'/>: <span className={cn('post')}>{item.category.title}</span></div>
      <div><MLText item='date'/>: <span className={cn('post')}>{item.edition}</span></div>
      <div> <span className={cn('price')}><MLText item='price'/>: {numberFormat(item.price)} ₽</span></div>
      <div><button onClick={()=>{callbacks.addToBasket(id)}}><MLText item={'addBtn'}/></button></div>
      </div>
    </Layout>
  )
}

export default React.memo(Descriptions);
