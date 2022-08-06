import './style.css';
import { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CatalogModalContent from './catalog-modal-content';
import Basket from '../../components/basket';
import Layout from '../../components/layout';
import Modal from '../../components/modal';
import CatalogList from './catalog-list';

const Catalog = ({ store }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cn = bem('Catalog');

  const cb = {
    onAddToBasket: useCallback((product) => {
      store.addToBasket(product);
    }, []),
    onDeleteFromBasket: useCallback((code) => {
      store.removeFromBasket(code);
    }, []),
    onModalClose: useCallback(() => {
      setIsModalOpen(false);
    }, []),
    onModalOpen: useCallback(() => {
      setIsModalOpen(true);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <div className={cn()}>
        <Basket
          className={cn('basket')}
          basketAction={cb.onModalOpen}
          summ={store.getState().basket.summ}
          quantity={store.getState().basket.countOfGoods}
        />
        <CatalogList
          items={store.getState().items}
          onAddToBasket={cb.onAddToBasket}
        />
        <Modal
          head={<div>Корзина</div>}
          isOpen={isModalOpen}
          onClose={cb.onModalClose}
        >
          <CatalogModalContent
            basket={store.getState().basket}
            onBasketDelete={cb.onDeleteFromBasket}
          />
        </Modal>
      </div>
    </Layout>
  );
};

Catalog.propTypes = {
  store: propTypes.object.isRequired,
};

export default Catalog;
