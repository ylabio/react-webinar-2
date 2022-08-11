import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import Button from '../button';

function ModalWindow({ title, closeModal, children }) {
  const cn = bem('ModalWindow');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <span className={cn('title')}>{title}</span>
          <Button className={cn('button')} onClick={() => closeModal(true)}>
            Закрыть
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  title: propTypes.string.isRequired,
  closeModal: propTypes.func,
  children: propTypes.node.isRequired,
};

ModalWindow.defaultProps = {
  closeModal: () => {},
};

export default React.memo(ModalWindow);
