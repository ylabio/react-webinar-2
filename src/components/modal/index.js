import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ active, setActive, children }) {
  const cn = bem('Modal');

  return (
    <div className={active ? 'Modal active' : 'Modal'} onClick={() => setActive(false)}>
      <div className={cn('content')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {};

Modal.defaultProps = {};

export default React.memo(Modal);
