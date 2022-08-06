import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Modal({visable, setVisable, children}){
	return (
		<div className={`modal ${visable ? 'active' : ''}`} onClick={() => setVisable(false)}>
			<div className={`content ${visable ? 'active' : 'content'}`} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

Modal.propTypes = {
	visable: propTypes.bool,
	setVisable: propTypes.func.isRequired,
	children: propTypes.node,
}

Modal.defaultProps = {
	setVisable: () => {}
}

export default React.memo(Modal);
