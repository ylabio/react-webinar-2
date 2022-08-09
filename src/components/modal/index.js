import React from 'react';
import propTypes from "prop-types";
import './style.css';

function Modal({isVisibleModal, closeModal, children}){
	const onOutside = e => {
		e.currentTarget === e.target && closeModal();
	};

	return isVisibleModal ? (
		<div className='Modal' onClick={onOutside}>
			<div className='Modal-container'>
				<div className='Modal-content'>
					{children}
				</div>
			</div>
		</div>
	) : null
}

Modal.propTypes = {
	isVisibleModal: propTypes.bool.isRequired,
	closeModal: propTypes.func
}

Modal.defaultProps = {
	closeModal: () => {}
}

export default Modal;
