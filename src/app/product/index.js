import React, { useCallback } from 'react'
import useStore from '../../utils/use-store'
import useSelector from '../../utils/use-selector'
import Layout from '../../components/layout'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import BasketSimple from '../../components/basket-simple'
import ProductInfo from '../../components/product-info'
import Menu from '../../components/menu'
import HeaderWrapper from '../../components/header-wrapper'

function Product() {
  console.log('Product')

  const store = useStore()
  const { id } = useParams()

  useEffect(() => {
    store.get('product').loadItem(id)
  }, [id])

  const select = useSelector((state) => ({
    item: state.product.item,
    maidIn: state.product.maidIn,
    category: state.product.category,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }))

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  }

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <HeaderWrapper>
        <Menu />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </HeaderWrapper>
      <ProductInfo
        onAdd={callbacks.addToBasket}
        item={select.item}
        maidIn={select.maidIn}
        category={select.category}
      />
    </Layout>
  )
}

export default React.memo(Product)
