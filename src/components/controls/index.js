import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import plural from 'plural-ru';
import './style.css';

function Controls(props){
  const cn = bem('Controls');
  const {totalCurrencyPrice, totalNumberInCart} = props;

  return (
    <div className={cn()}>
      В корзине:     
      <span className={cn('info')}>
        {!totalNumberInCart 
          ? 'пусто'
          : `${totalNumberInCart} ${plural(totalNumberInCart, 'товар', 'товара', 'товаров')} / ${totalCurrencyPrice}`}
      </span>
      <button className={cn('button')} onClick={props.onChangeModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onChangeModal: propTypes.func.isRequired,
  totalNumberInCart: propTypes.number.isRequired,
  totalCurrencyPrice: propTypes.string.isRequired
}

Controls.defaultProps = {
}

export default React.memo(Controls);
