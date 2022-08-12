import React, { useEffect, useCallback } from 'react'
import useStore from '../../utils/use-store'
import {useParams} from 'react-router-dom'
import useSelector from '../../utils/use-selector'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import ItemInfo from '../../components/item-info'
import Loader from '../../components/loader'

function ItemPage() {
  const store = useStore()
  const { id } = useParams()

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
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), [id]),
  };

  const {item, amount, sum} = useSelector(state => ({
    item: state.item.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }))

  return (
    <>
      {item ?
        <Layout head={<h1>{item.title}</h1>}>
          <Navbar onOpen={callbacks.openModalBasket} amount={amount} sum={sum}/>
          <ItemInfo item={item} onAdd={callbacks.addToBasket} />
        </Layout>
        : <Loader />
      }
    </>
  )
}

export default React.memo(ItemPage)