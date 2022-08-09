import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ head, children, onOpenModal }) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          {head}
          <button
            className={cn('button')}
            onClick={() => {
              onOpenModal();
            }}>
            Закрыть
          </button>
        </div>
        <>{children}</>
      </div>
    </div>
  );
}

Modal.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  onOpenModal: propTypes.func,
};

Modal.defaultProps = {
  onOpenModal: () => {},
};

export default React.memo(Modal);
