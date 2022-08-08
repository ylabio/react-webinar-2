import React, { useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './index.css';
import Basket from './components/basket';
import Layout from './components/layout';
import CatalogList from './components/catalog-list';
import Modal from './components/modal';
import CatalogModalContent from './components/catalog-modal-content';
import './app.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState({ isOpen: false, type: null });
  const cn = bem('Catalog');

  const cb = {
    onAddToBasket: useCallback((product) => {
      store.addToBasket(product);
    }, []),
    onDeleteFromBasket: useCallback((code) => {
      store.removeFromBasket(code);
    }, []),
    onModalClose: useCallback(() => {
      setModal((prev) => ({ ...prev, isOpen: false }));
    }, []),
    onBasketOpen: useCallback(() => {
      setModal((prev) => ({
        ...prev,
        type: 'basket',
        isOpen: true,
      }));
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <div className={cn()}>
        <Basket
          className={cn('basket')}
          basketAction={cb.onBasketOpen}
          summ={store.getState().basket.summ}
          quantity={store.getState().basket.goods.length}
        />
        <CatalogList items={store.getState().items} onAddToBasket={cb.onAddToBasket} />
        <Modal head={<div>Корзина</div>} isOpen={modal.isOpen} onClose={cb.onModalClose}>
          {modal.type === 'basket' && (
            <CatalogModalContent
              basket={store.getState().basket}
              onBasketDelete={cb.onDeleteFromBasket}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired,
};

export default App;
