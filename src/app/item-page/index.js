import React, { useEffect, useCallback } from 'react'
import useStore from '../../utils/use-store'
import {useParams} from 'react-router-dom'
import useSelector from '../../utils/use-selector'
import Layout from '../../components/layout'
import { cn } from '@bem-react/classname'
import './styles.css'
import BasketSimple from '../../components/basket-simple'

function ItemPage() {
  const store = useStore()
  const { id } = useParams()
  const bem = cn('ItemPage')

  useEffect(() => {
    store.get('item').load(id)
    return () => {
      store.get('item').unmount()
    }
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), []),
  };

  const {item, amount, sum} = useSelector(state => ({
    item: state.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }))

  return (
    <>
      {item.item && 
        <Layout head={<h1>{item.item.title}</h1>}>
          <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum}/>
          <div className={bem()}>
            <div>{item.item.description}</div>
            <div>Страна производитель: <span>{item.item.country}</span></div>
            <div>Категория: <span>{item.item.category}</span></div>
            <div>Год выпуска: <span>{item.item.edition}</span></div>
            <h2>Цена: {item.item.price}</h2>
            <button onClick={callbacks.addToBasket}>Добавить</button>
          </div>
        </Layout>
      }
    </>
  )
}

export default ItemPage