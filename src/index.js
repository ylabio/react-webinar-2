import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import Services from './services';
import ServicesProvider from "./provider";
import config from "./config";
import {Provider} from 'react-redux';

// Менеджер сервисов
const services = new Services(config);

// Корень React приложения
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={services.storeRedux}>
    <ServicesProvider services={services}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ServicesProvider>
  </Provider>
);
