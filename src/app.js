import React, { useCallback, useState } from 'react'
import Controls from './components/controls'
import List from './components/list'
import Layout from './components/layout'
import Modal from './components/modal'
import Header from './components/header'
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

  return (
    <Layout head={<Header title='Магазин' />}>
      <Controls clickHandler={callbacks.visibilityModal} title='Перейти' />
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
