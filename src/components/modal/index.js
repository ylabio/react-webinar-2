import React from 'react';
import './style.css';


function Modal({head, children, onCloseModal}){


  return (
    <div className='Modal'>
      <div className='Modal__body'>
        <div className='Modal__inner'>
          <div className='Modal__head'>
            {head}
            <button className='Modal__button-close' onClick={onCloseModal}>Закрыть</button>
          </div>
          <div className='Modal__content'>
            {children}
          </div>
          <div className='Modal__footer'>
              <span className='Modal__total'>Итого</span>
              <span className='Modal__price'>233 ₽</span>
          </div>
        </div>
      </div>
    </div>
  )
}


export default React.memo(Modal);
