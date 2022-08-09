import React, { useCallback } from 'react'
import CartItem from './components/cart-item'
import Controls from './components/controls'
import Item from './components/item'
import Layout from './components/layout'
import List from './components/list'
import Popup from './components/popup'
import TotalPrice from './components/total-price'
import { CART_POPUP } from './constants'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onDeleteItem: useCallback(code => {
      store.deleteItem(code)
    }, []),
    onAddItemInCart: useCallback(item => {
      store.addInCart(item)
    }, []),
    onOpenCart: useCallback(() => {
      store.setCartPopupVisibility(true)
    }, []),
    onCloseCart: useCallback(() => {
      store.setCartPopupVisibility(false)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onOpenCart={callbacks.onOpenCart} cart={store.getState().cart} />
      <List
        items={store.getState().items.map(item => ({
          item,
          onAddInCart: callbacks.onAddItemInCart
        }))}
        render={props => <Item {...props} />}
      />
      {store.getState().popup === CART_POPUP && (
        <Popup header={'Корзина'} onClose={callbacks.onCloseCart}>
          <List
            items={store.getState().cart.items.map(item => ({
              item,
              onDelete: callbacks.onDeleteItem
            }))}
            render={props => <CartItem {...props} />}
          />
          <TotalPrice price={store.getState().cart.price} />
        </Popup>
      )}
    </Layout>
  )
}

export default App
