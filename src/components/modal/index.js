import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Modal({modal, setModal, children}){
	return (
		<div className={`modal ${modal ? 'active' : ''}`} onClick={() => setModal(false)}>
			<div className={`content ${modal ? 'active' : 'content'}`} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

Modal.propTypes = {
	modal: propTypes.bool,
	setModal: propTypes.func.isRequired,
	children: propTypes.node,
}

Modal.defaultProps = {
	setModal: () => {}
}

export default React.memo(Modal);