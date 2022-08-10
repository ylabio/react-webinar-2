import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import List from "../list"
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Modal({
  head,
  amountOfUniqueGoodsInBasket,
  isModalActive,
  onModalTogge,
  children
}) {
  const cn = bem('Modal');

  const callbacks = {
    onModalTogge: useCallback(() => {
      onModalTogge();
    }, []),
  };

  return (
    <div className={cn()} style={{ display: isModalActive ? 'block' : 'none' }}>
      <div
        className={cn('modalWindow')}
        style={{ overflow: (amountOfUniqueGoodsInBasket > 6) ? "scroll" : 'visible' }}
      >
        <div className={cn('head')}>
          <p>{head}</p>
          <button
            className={cn('button')}
            onClick={callbacks.onModalTogge}
          >Закрыть</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  head: propTypes.string, // Обязательное свойство - заголовок для модалки
  children: propTypes.node, // Обязательное свойство -контент модального окна
  amountOfUniqueGoodsInBasket: propTypes.number, // Обязательное свойство -количество уникальных товаров в корзине
  isModalActive: propTypes.bool, // Обязательное свойство - флаг модального окна
  onModalTogge: propTypes.func, // Обязательное свойство - функция переключения флаг модального окна
}

List.defaultProps = {
  head: 'Заголовок',
  isModalActive: false,
  onModalTogge: () => { },
  onRemoveItemFromBasket: () => { },
}

export default React.memo(Modal);