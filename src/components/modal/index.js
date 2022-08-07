import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/**
 * Модальное окно
 * @param props
 * @param {element} props.children Содержимое модалки
 * @param {boolean} props.isModalOpen Состояние модалки
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Modal({children, isModalOpen}) {
  const cn = bem('Modal')

  return (
    <div className={cn({'opened': isModalOpen})}>
      <div className={cn('container')}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: propTypes.element,
  isModalOpen: propTypes.bool.isRequired,
}

Modal.defaultProps = {
  isModalOpen: false,
}

export default React.memo(Modal);