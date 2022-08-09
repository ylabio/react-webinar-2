import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function BasketStats(props){
  return (
    <div className='Basket-stats'>
      {props.stats.goods
        ?
          'Итого\t\t' + props.stats.price.toLocaleString('ru-RU') + ' ₽'
        :
          'Нет товаров в корзине!'
      }
    </div>
  );
};

BasketStats.propTypes = {
  stats: propTypes.object.isRequired
}

BasketStats.defaultProps = {
  
}

export default React.memo(BasketStats);