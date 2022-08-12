import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import {useParams, Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import BasketSimple from "../../components/basket-simple";
import './style.css';

function Card() {
  const params = useParams();
  const cn = bem('Card');
  const store = useStore();
  const select = useSelector(state => ({
    item: state.basket.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  console.log(select.item)

  useEffect(() => {
    store.get('basket').getGoodById(params.id);
  } , [])

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    onAdd: useCallback((id) => store.get('basket').addToBasket(id), [])
  };

  return (
    <Layout head={<h1>Название товара</h1>}>
      <section className={cn()}>
        <BasketSimple
          onOpen={callbacks.openModalBasket} 
          amount={select.amount} 
          sum={select.sum}
        />

        <main className={cn('main')}>
          <div>{select.item?.description}</div>
          <div className={cn('block')}>
            Страна производитель: 
            <span className={cn('value')}>{select.item?.maidIn?.title} ({select.item?.maidIn?.code})</span>
          </div>
          <div className={cn('block')}>
            Категория:
            <span className={cn('value')}>{select.item?.category?.title}</span>
          </div>
          <div className={cn('block')}>
            Год выпуска:
            <span className={cn('value')}>{select.item?.edition}</span>
          </div>
          <div className={cn('price')}>
            Цена:
            <span>{(select.item?.price)?.toLocaleString('ru')} ₽</span>
          </div>
          <button 
            className={cn('button')}
            onClick={() => callbacks.onAdd(select.item?._id)}
          >Добавить</button>
        </main>
      </section>
    </Layout>
  )
}

export default React.memo(Card);
