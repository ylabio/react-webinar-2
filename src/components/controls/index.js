import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls({cartLabel, openCart}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      {cartLabel && <div className={cn('actions')}>
        В корзине: <span>{cartLabel}</span>
      </div>}
      {openCart && <div className={cn('actions')}>
        <button onClick={openCart}>Перейти</button>
      </div>}
    </div>
  )
}

Controls.propTypes = {
  cartLabel: propTypes.string,
  openCart: propTypes.func
}

export default React.memo(Controls);
