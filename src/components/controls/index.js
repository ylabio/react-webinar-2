import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {getDataForControl} from '../../utils';
import './style.css';

function Controls({store, openPopup}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <p className={cn('cart')}>
        В корзине:
        <span className={cn('cart-info')}>
          {store.allSumItemsInCart > 0 ?
            getDataForControl(store.allSumItemsInCart, store.allPriceItemsInCart)
            :
            'пусто'
          }
        </span>
      </p>
      <button onClick={openPopup}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  store: propTypes.object.isRequired,
  openPopup: propTypes.func.isRequired
}

export default React.memo(Controls);
