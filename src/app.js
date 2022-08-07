import React, { useCallback, useState } from 'react'
import Controls from './components/controls'
import List from './components/list'
import Layout from './components/layout'
import Modal from './components/modal'
import BasketModal from './components/basket-modal'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [tab, setTab] = useState(false)

  const callbacks = {
    onAddInBasket: useCallback((code) => {
      store.addInBasket(code)
    }, []),
    onDeleteFromBasket: useCallback((code) => {
      store.deleteFromBasket(code)
    }, [])
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls basket={store.getState().basket} openTab={() => setTab(true)} />
      <List items={store.getState().items} usingFunc={callbacks.onAddInBasket} action={'Добавить'} />
      {tab && (
        <Modal>
          <BasketModal
            onCloseTab={() => setTab(false)}
            items={store.getState().basket}
            usingFunc={callbacks.onDeleteFromBasket}
          />
        </Modal>
      )}
    </Layout>
  )
}

export default App
