import React, { useCallback } from 'react'
import Controls from './components/controls'
import List from './components/list'
import Layout from './components/layout'
import { counter } from './utils'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter()
      store.createItem({ code, title: `Новая запись ${code}` })
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code)
    }, []),
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls onAdd={callbacks.onAdd} />
      <List items={store.getState().items} onItemDelete={callbacks.onDeleteItems} />
    </Layout>
  )
}

export default App
