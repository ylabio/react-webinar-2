import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ShopCart({header, onClose, children}){
  const cn = bem('Modal');
  
  return (
    <div className={cn()} onClick={onClose}>
      <div className={cn('content')} onClick={(e)=>e.stopPropagation()}>    
        <div className={cn('head')}>
            <h1>{header}</h1>
            <button className={cn('button')} onClick={onClose}>
                Закрыть
            </button>
        </div>
        <div className={cn('body')}>
            {children}
        </div>
      </div>
    </div>
);
}

ShopCart.propTypes = {
    onClose: propTypes.func.isRequired,
    header: propTypes.string.isRequired,
    children: propTypes.node,
}

export default React.memo(ShopCart);