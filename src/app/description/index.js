import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Layout from '../../components/layout';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import BasketSimple from '../../components/basket-simple';
import { useParams } from 'react-router-dom';
import numberFormat from '../../utils/number-format';

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
  };
  return (
    <Layout head={<h1>{item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <div className={cn('content')}>
      <div className={cn('description')}>{item.description}</div>
      <div>Страна Производитель: <span className={cn('post')}>{item.maidIn.title} ({item.maidIn.code})</span></div>
      <div>Категория: <span className={cn('post')}>{item.category.title}</span></div>
      <div>Год выпуска: <span className={cn('post')}>{item.edition}</span></div>
      <div> <span className={cn('price')}>Цена: {numberFormat(item.price)} ₽</span></div>
      <div><button onClick={()=>{callbacks.addToBasket(id)}}>Добавить</button></div>
      </div>
    </Layout>
  )
}

export default React.memo(Descriptions);
