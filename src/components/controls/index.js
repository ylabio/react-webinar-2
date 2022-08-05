import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {getSumPrice} from '../../utils';

function Controls(props) {


  return (
    <div className='Controls'>
      <p className={'Controls__basket-block'}><span className={'Controls__text'}>В корзине:</span> <span className={'Controls__products-sum'}>{props.userProducts.length > 0
          ? props.userProducts.length + ' шт ' + '/ ' + getSumPrice(props.userProducts)  + ' ₽'
          : 'пусто'}</span></p>
      <button>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
