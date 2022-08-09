import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/**
 * Модальное окно
 * @param props
 * @param {node} props.head Шапка модалки
 * @param {node} props.children Содержимое модалки
 * @param {function} onModalClose Функция закрытия модалки
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Modal({head, children, onModalClose}) {
  const cn = bem('Modal')
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('head')}>
          {head}
          <button onClick={onModalClose}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  onModalClose: propTypes.func.isRequired,
}

Modal.defaultProps = {
  head: <></>,
  children: <></>,
}

export default React.memo(Modal);