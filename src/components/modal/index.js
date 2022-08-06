import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/*
 * Модальное окно
 * @param isOpened {boolean} Является ли модальное окно отрытым
 * @param children {React.ReactElement} Виртуальные элементы React
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Modal({isOpened, children}) {
  const cn = bem('Modal');

  return (
    <div className={cn({'opened': isOpened})}>
      <div className={cn('container')}>
        {children}
      </div>
    </div>
  )
};

Modal.propTypes = {
  children: propTypes.element,
  isOpened: propTypes.bool.isRequired
};

Modal.defaultProps = {
  isOpened: false
};

export default React.memo(Modal);
