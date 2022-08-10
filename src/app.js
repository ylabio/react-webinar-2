import React, { useCallback, useState } from 'react'
import List from './components/list'
import Layout from './components/layout'
import Modal from './components/modal'
import Header from './components/header'
import ModalFooter from './components/modal-footer'
import PageHeader from './components/page-header'
import ModalList from './components/modal-list'
import item from './components/item'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [activeModal, setActiveModal] = useState(false)

  const basketArr = store.getState().basket
  const itemsArr = store.getState().items
  const sum = store.getState().sum.toLocaleString()
  const quantity = store.getState().quantity

  const callbacks = {
    visibilityModal: useCallback(() => {
      setActiveModal((visibility) => !visibility)
    }, [activeModal, setActiveModal]),
    addItem: useCallback((code) => {
      store.addItem(code)
    }, []),
    onDeleteItems: useCallback((item) => {
      store.deleteItem(item)
    }, []),
  }

  return (
    <>
      <Layout head={<Header title='Магазин' />}>
        <PageHeader
          quantity={quantity}
          sum={sum}
          titleBtn='Перейти'
          clickBtn={callbacks.visibilityModal}
        />
        <List items={itemsArr} titleBtn='Добавить' clickBtn={callbacks.addItem} />
      </Layout>
      {activeModal && (
        <Modal activeModal={activeModal} setActiveModa={setActiveModal}>
          <Header title='Корзина' titleBtn='Закрыть' clickBtn={callbacks.visibilityModal} />
          <ModalList items={basketArr} titleBtn='Удалить' clickBtn={callbacks.onDeleteItems} />
          <ModalFooter sum={sum} />
        </Modal>
      )}
    </>
  )
}

export default App
