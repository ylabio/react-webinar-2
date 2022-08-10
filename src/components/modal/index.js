import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CustomButton from '../custom-button';
import './style.css';

function Modal({children, title, setVisible}) {
  const cn = bem('Modal');  
  /* Изменил модальное окно согласно замечаниям.
     Теперь оно имеет свой layout и header.
  */
  return (
    <div className={cn()} onClick={() => {setVisible(false)}}>
      <div className={cn('window')} onClick={(e) => e.stopPropagation()}>
        <div className={cn('head')}>
          <h1>{title}</h1>
          <span className={cn('head-button')}>
            <CustomButton onClick={() => setVisible(false)}>Закрыть</CustomButton>
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string.isRequired,
  setVisible: propTypes.func
}

Modal.defaultProps = {
  setVisible: () => {}
}

export default Modal;