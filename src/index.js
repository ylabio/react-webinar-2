import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import Store from './store'
import { StoreContext } from './store/context'

// Внешнее состояние
const store = new Store()

const root = createRoot(document.getElementById('root'))

// Первый рендер (один раз)
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
)
