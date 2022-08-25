import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import Services from './services';
import ServicesProvider from "./provider";
import config from "./config";
import {createStore} from "redux";
import {Provider} from 'react-redux';

// Менеджер сервисов
const services = new Services(config);

// Корень React приложения
const root = createRoot(document.getElementById('root'));


///// ПРИМЕР ИНИЦИАЛИАЗЦИИ REDUX

// Начальное состояние для управления модалками
const initialState = {
  name: ''
}

// Обработчик действий в redux
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "modal/open":
      return { ...state, name: action.payload.name};
    case "modal/close":
      return { ...state, name: null };
    default:
      // Нет изменений
      return state;
  }
}

// Внешнее состояние на redux
const storeRedux = createStore(reducer);


root.render(
  <Provider store={storeRedux}>
    <ServicesProvider services={services}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ServicesProvider>
  </Provider>
);
