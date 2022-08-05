import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  const callbacks = {
		onToggleModal: useCallback(() => {
      props.onToggleModal();
		}, [props.onToggleModal, props.isOpenModal])
  };

  return (
    <div className={`${cn()} ${props.isOpenModal ? 'Modal_active' : ''}`} onClick={callbacks.onToggleModal}>
			<div className={cn('wrapper')}>
				<div className={cn('content')} onClick={(e) => e.stopPropagation()}>
					{props.children}
				</div>
			</div>
    </div>
  )
}

Modal.propTypes = {
	isOpenModal: propTypes.bool,
	onToggleModal: propTypes.func,
	children: propTypes.node
}

Modal.defaultProps = {
	isOpenModal: false,
	onToggleModal: () => {}
}

export default React.memo(Modal);
