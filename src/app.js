import React, { useCallback, useState } from 'react'
import List from './components/list'
import Layout from './components/layout'
import Modal from './components/modal'
import Header from './components/header'
import { sumElements } from './utils'
import ModalFooter from './components/modal-footer'
import PageHeader from './components/page-header'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [activeModal, setActiveModal] = useState(false)

  const basketArr = store.getState().basket
  const sum = store.getState().sum.toLocaleString()

  const callbacks = {
    visibilityModal: useCallback(() => {
      setActiveModal((visibility) => !visibility)
    }, [activeModal, setActiveModal]),
    addItem: useCallback((item) => {
      store.addItem(item)
    }, []),
    onDeleteItems: useCallback((item) => {
      store.deleteItem(item)
    }, []),
  }

  return (
    <>
      <Layout head={<Header title='Магазин' />}>
        <PageHeader
          arrLength={basketArr.length}
          sum={sum}
          titleBtn='Перейти'
          clickBtn={callbacks.visibilityModal}
        />
        <List items={store.getState().items} titleBtn='Добавить' clickBtn={callbacks.addItem} />
      </Layout>
      {activeModal && (
        <Modal activeModal={activeModal} setActiveModa={setActiveModal}>
          <Header title='Корзина' titleBtn='Закрыть' clickBtn={callbacks.visibilityModal} />
          <List items={basketArr} titleBtn='Удалить' clickBtn={callbacks.onDeleteItems} />
          <ModalFooter sum={sum} />
        </Modal>
      )}
    </>
  )
}

export default App
