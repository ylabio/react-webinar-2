import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import Services from './services';
import ServicesProvider from "./provider";
import config from "./config";

// Менеджер сервисов
const services = new Services(config);

// Корень React приложения
const root = createRoot(document.getElementById('root'));

// Первый рендер (один раз)
root.render(
  <ServicesProvider services={services}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ServicesProvider>
);
