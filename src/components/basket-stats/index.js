import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function BasketStats(props){
  return (
    <div className='Basket-stats'>
      {props.goods
        ?
          'Итого\t\t' + props.price.toLocaleString('ru-RU') + ' ₽'
        :
          'Нет товаров в корзине!'
      }
    </div>
  );
};

BasketStats.propTypes = {
  goods: propTypes.number,
  price: propTypes.number
}

BasketStats.defaultProps = {
  goods: 0,
  price: 0
}

export default React.memo(BasketStats);