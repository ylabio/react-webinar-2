import React from 'react';
import propTypes from "prop-types";
import './style.css';
import Button from '../button';
import Head from '../head';

function Modal({closeModal, children}){
  const onOutside = e => {
	  e.currentTarget === e.target && closeModal();
  };

  const button = <Button title='Закрыть' callback={closeModal}/>;

  return (
	  <div className='Modal' onClick={onOutside}>
		  <div className='Modal-container'>
			  <div className='Modal-content'>
				  <Head
					  title='Корзина'
					  button={button}
					/>
				  {children}
			  </div>
		  </div>
	  </div>
  )
}

Modal.propTypes = {
	closeModal: propTypes.func
}

Modal.defaultProps = {
	closeModal: () => {}
}

export default Modal;
