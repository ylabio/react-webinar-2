import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './app';
import Main from './app/main';
import ItemDetails from './components/item-details';
import Store from './store';
import {StoreContext} from './store/context';

// Внешнее состояние
const store = new Store();

// Корень React приложения
const root = createRoot(document.getElementById('root'));

// Первый рендер (один раз)
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="items/:itemId" element={<ItemDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StoreContext.Provider>
);
