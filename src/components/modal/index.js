import React from 'react';
import propTypes from "prop-types";
import './style.css';

/**
 * Модальное окно
 * @param onCloseModal, title, children Функция закрытия окна, заголовок и дочерние элементы
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Modal({onCloseModal, title, children}) {
  return (
    <div className='Modal'>
      <div className='Modal-overlay' onClick={onCloseModal}></div>
      <div className='Modal-content'>
        <header className='Modal-head'>
          <h1 className='Modal-title'>{title}</h1>
          <button className='Modal-closeBtn'
                  onClick={onCloseModal}>Закрыть</button>
        </header>
        <div className='Modal-body'>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: propTypes.node,
  children: propTypes.node,
  onCloseModal: propTypes.func.isRequired,
}

Modal.defaultProps = {
  title: 'Модальное окно',
  children: '',
}

export default React.memo(Modal);
