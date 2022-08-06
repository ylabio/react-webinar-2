import React, { useCallback } from 'react'
import CartItem from './components/cart-item'
import Controls from './components/controls'
import Item from './components/item'
import Layout from './components/layout'
import List from './components/list'
import Popup from './components/popup'
import TotalPrice from './components/total-price'

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
    onOpenCartPopup: useCallback(() => {
      store.setPopupVisibility(true)
    }, []),
    onCloseCartPopup: useCallback(() => {
      store.setPopupVisibility(false)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        onCartOpen={callbacks.onOpenCartPopup}
        cart={store.getState().cart}
      />
      <List
        items={store.getState().items.map(item => ({
          item,
          onAddInCart: callbacks.onAddItemInCart
        }))}
        itemTemplate={Item}
      />
      {store.getState().cart.visible && (
        <Popup
          header={'Корзина'}
          onClose={callbacks.onCloseCartPopup}
        >
          <List
            items={store.getState().cart.items.map(item => ({
              item,
              onDelete: callbacks.onDeleteItem
            }))}
            itemTemplate={CartItem}
          />
          <TotalPrice price={store.getState().cart.price} />
        </Popup>
      )}
    </Layout>
  )
}

export default App
