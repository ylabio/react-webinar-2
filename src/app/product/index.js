import List from '../../components/list'
import React, { useCallback } from 'react'
import BasketTotal from '../../components/basket-total'
import LayoutModal from '../../components/layout-modal'
import ItemBasket from '../../components/item-basket'
import useStore from '../../utils/use-store'
import useSelector from '../../utils/use-selector'
import Layout from '../../components/layout'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import BasketSimple from '../../components/basket-simple'
import ProductInfo from '../../components/product-info'

function Product() {
  console.log('Product')

  const { id } = useParams()

  useEffect(() => {
    // store.get('catalog').load()
    store.get('catalog').loadItem(id)
  }, [])

  const store = useStore()

  const select = useSelector((state) => ({
    // items: state.catalog.items,
    item: state.catalog.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }))

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  }
  console.log(select.item)

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductInfo onAdd={callbacks.addToBasket} item={select.item} />
    </Layout>
  )
}

export default React.memo(Product)
