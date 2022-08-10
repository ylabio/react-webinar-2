import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import propTypes from 'prop-types';

function Modal(props) {
  const { onClose, children, title } = props;

  const cn = bem('Modal');
  return (
    <div className={cn('wrapper')}>
      <div className={cn()}>
        <div className={cn('head')}>
          <h2>{title}</h2>
          <Button onClick={() => onClose()}>Закрыть</Button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};

export default React.memo(Modal);
