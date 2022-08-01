import React from 'react'
import { counter } from './utils.js'
import './style.css'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState()

  const onClick = (itemId) => {
    items.forEach((item) => {
      if (item.code !== itemId || item.selected) {
        item.selected = false
      } else if (item.code === itemId && !item.selected) {
        store.countItem(itemId)
      }
    })
    store.selectItem(itemId)
  }

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button
          onClick={() => {
            const code = counter()
            store.createItem({ code, title: `Новая запись ${code}` })
          }}>
          {' '}
          Добавить{' '}
        </button>
      </div>
      <div className='App__center'>
        <div className='List'>
          {items.map((item) => (
            <div key={item.code} className='List__item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => onClick(item.code)}>
                <div className='Item__number'>{item.code}</div>
                <div className='Item__title'>
                  <span>{item.title}</span>
                  {item.count && <span>{' | Выделялось ' + item.count + ' раз'}</span>}
                </div>
                <div className='Item__actions'>
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
