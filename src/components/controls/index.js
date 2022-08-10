import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls(props){

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      В корзине:
      { props.getItemsSum > 0 &&
        <div className={cn('sum')}>
          {`${props.getItemsSum + ' ' + plural(props.getItemsSum, 'товар', 'товара', 'товаров')} / ${props.getPriceSum} ₽`}
        </div> ||
        <div className={cn('sum')}>
          пусто
        </div>
      }
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={props.isModalActive}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  isModalActive: propTypes.func.isRequired,
  getItemsSum: propTypes.number,
  getPriceSum: propTypes.string
}

Controls.defaultProps = {
  getItemsSum: 0,
  getPriceSum: '0',
}

export default React.memo(Controls);
