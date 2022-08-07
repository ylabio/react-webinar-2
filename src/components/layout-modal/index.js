import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

const LayoutModal = ({ head, children, onActiveCart }) => {
  const cn = bem('LayoutModal');

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('head')}>
          {head}
          <button className={cn('actions')} onClick={onActiveCart}>
            Закрыть
          </button>
        </div>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  );
};

LayoutModal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  onActiveCart: propTypes.func,
};

LayoutModal.defaultProps = {
  onActiveCart: () => {},
};

export default memo(LayoutModal);
