import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import {Link} from "react-router-dom";


function BasketSimple({sum, amount, onOpen, toFirstPage}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link className={cn('toFirstPage')} to={'/'} onClick={toFirstPage}>
        Главная
      </Link>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : `пусто`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>Перейти</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  toFirstPage: propTypes.func,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  toFirstPage: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
