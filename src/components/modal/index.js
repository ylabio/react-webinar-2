import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Modal({ setIsModalOpen, header, footer, children }) {
  const cn = bem('Modal');

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('header')}>
          {header}
          <button onClick={handleCloseModal}>Закрыть</button>
        </div>

        <div className={cn('list')}>{children}</div>

        <div className={cn('footer')}>{footer}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setIsModalOpen: propTypes.func.isRequired,
  onItemDeleteFromCart: propTypes.func,
  children: propTypes.node,
  header: propTypes.node,
  footer: propTypes.node,
};

Modal.defaultProps = {
  setIsModalOpen: () => {},
  onItemDeleteFromCart: () => {},
};

export default React.memo(Modal);
