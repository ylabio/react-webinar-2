import React, {useMemo} from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { divideNumberByPieces } from '../../utils';
import plural from 'plural-ru';

function Controls(props){

  const cn = bem('Controls');

  const { quantity, sum } = useMemo(() => props.totals, [props.totals]);
  const isEmptyCart = quantity !==0 ? `${quantity} ${plural(quantity, 'товар', 'товара', 'товаров')} / ${divideNumberByPieces(sum)} ₽` : 'пусто';
  return (
    <div className={cn()}>
      <div className={cn('info')}>
        В корзине:
        <span className={cn('amounts')} >
          {isEmptyCart}
        </span>
      </div>
      <div className={cn('actions')}>
        <button className={cn('actions-button')} onClick={props.onShowCart}>Перейти</button>
      </div>
    </div>
  )
}


Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  totals: propTypes.object.isRequired,
  onShowCart: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  cart: [],
  onShowCart: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
