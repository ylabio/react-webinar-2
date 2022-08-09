import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

/*
 * Модальное окно
 * @param isOpened {boolean} Является ли модальное окно отрытым
 * @param children {React.ReactElement} Виртуальные элементы React
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Modal({ children, title, onCloseModal }) {
  const cn = bem('Modal');

  return (
    <div className={cn({ opened: true })}>
      <div className={cn('container')}>
        <div className={cn('head')}>
          <h2>{title}</h2>
          <button onClick={onCloseModal}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: propTypes.element,
  isOpened: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
};

Modal.defaultProps = {
  isOpened: false,
  children: <></>,
  title: '',
};

export default React.memo(Modal);
