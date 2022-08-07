import React, {useCallback, useEffect} from 'react';
import Layout from "../layout";
import ListModal from "../list-modal";
import TotalSum from '../total-sum';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

const Modal = ({ isVisible, basket, onDelete, onClose }) => {
  const cn = bem('Modal');

  const callbacks = {
    onClose: useCallback(() => {
      onClose(false);
    }, []),
  };

  const keydownHandler = ({ key }) => key === 'Escape' && callbacks.onClose();

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return isVisible && (
    <div className={cn()} onClick={callbacks.onClose}>
      <div className={cn('dialog')} onClick={e => e.stopPropagation()}>
      <Layout 
        head={<h1>Корзина</h1>} 
        btn={<button onClick={callbacks.onClose}>Закрыть</button>}
      >
        {basket.length ? 
        <>
          <ListModal 
            basket={basket}
            onItemDelete={onDelete}
          />
          <TotalSum basket={basket} />
        </>
        :
          <h2>Корзина пуста</h2>}
        </Layout>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: propTypes.bool.isRequired,
  basket: propTypes.arrayOf(propTypes.object).isRequired,
  onDelete: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired
}

Modal.defaultProps = {
  basket: [],
  onDelete: () => {},
  onClose: () => {}
}

export default React.memo(Modal);