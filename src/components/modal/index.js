import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  const callbacks = {
		onToggleModal: useCallback(() => {
      props.onToggleModal();
		}, [props.onToggleModal])
  };

  return (
    <div className={cn()} onClick={callbacks.onToggleModal}>
			<div className={cn('wrapper')}>
				<div className={cn('content')} onClick={(e) => e.stopPropagation()}>
					<div className={cn('head')}>
						{props.title}
						<button onClick={callbacks.onToggleModal}>Закрыть</button>
					</div>
					{props.children}
				</div>
			</div>
    </div>
  )
}

Modal.propTypes = {
	onToggleModal: propTypes.func,
	title: propTypes.node,
	children: propTypes.node
}

Modal.defaultProps = {
	onToggleModal: () => {}
}

export default React.memo(Modal);
