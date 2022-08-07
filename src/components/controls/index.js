import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from '@bem-react/classname';
import {arrFromSet} from '../../utils.js'
import './style.css';

function Controls(props){

  const cn = bem('Controls');

  const [priceSum, setPriceSum] = React.useState(0);
  const [itemsSum, setItemsSum] = React.useState(0);

  React.useEffect(() => {
    setPriceSum(Number(props.cart.map(i => i.price).reduce((a, b) => (a + b) , 0)));
    setItemsSum(Number(arrFromSet(props.cart).length));
  }, [props.cart]);

  return (
    <div className={cn()}>
      В корзине:
      <div className={cn('sum')}>
        {itemsSum} {plural(itemsSum, 'товар', 'товара', 'товаров')} / {priceSum} ₽
      </div>
      <div className={cn('actions')}>
        <button className={cn('btn-tocart')} onClick={props.isModalActive}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  isModalActive: propTypes.func.isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {
  cart: []
}

export default React.memo(Controls);
