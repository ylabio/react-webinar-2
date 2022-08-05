import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';

/** Utils */
import {toSpacedNum} from '../../utils.js';

/** Styles */
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div>
        В корзине:
        <b className={cn('basket-info')}>{props.basketProductsCount} {plural(props.basketProductsCount, 'товар', 'товара', 'товаров')}</b>
        <b>/</b>
        <b className={cn('basket-info')}>{toSpacedNum(props.totalSumm)} ₽</b>
      </div>
      <button onClick={props.onOpenBasket}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  basketProductsCount: propTypes.number,
  totalSumm: propTypes.number,
  onOpenBasket: propTypes.func.isRequired // Обяхательное свойство - функция
};

Controls.defaultProps = {
  basketProductsCount: 0,
  totalSumm: 0,
  onOpenBasket: () => {} // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);
