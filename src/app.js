import React, { useCallback, useState } from 'react'
import Controls from './components/controls'
import List from './components/list'
import Layout from './components/layout'
import Modal from './components/modal'
import Header from './components/header'
import { sumElements } from './utils'
// import { counter } from './utils'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [activeModal, setActiveModal] = useState(false)

  const callbacks = {
    visibilityModal: useCallback(() => {
      setActiveModal((visibility) => !visibility)
    }, [activeModal, setActiveModal]),
    addItem: useCallback((item) => {
      store.addItem(item)
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code)
    }, []),
  }

  const basket = store.getState().basket

  return (
    <Layout head={<Header title='Магазин' />}>
      <div>
        <span>
          В корзине:{' '}
          {basket.length ? basket.length + ' товаров / ' + sumElements(basket, 'price') : 'пусто'}
          {/* {sumElements(store.getState().basket, 'price')} */}
        </span>
        <Controls clickHandler={callbacks.visibilityModal} title='Перейти' />
      </div>

      <List
        items={store.getState().items}
        // onItemDelete={callbacks.onDeleteItems}
        addItem={callbacks.addItem}
      />
      <Modal activeModal={activeModal} setActiveModa={setActiveModal}>
        <Header
          title='Корзина'
          button={<Controls clickHandler={callbacks.visibilityModal} title='Закрыть' />}
        />
        <List
          items={store.getState().basket}
          // onItemDelete={callbacks.onDeleteItems}
          addItem={callbacks.addItem}
        />
      </Modal>
    </Layout>
  )
}

export default App
