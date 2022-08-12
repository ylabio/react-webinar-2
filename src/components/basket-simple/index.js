import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { Link } from 'react-router-dom';


function BasketSimple({sum, amount, onOpen, toNull}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link 
        onClick={toNull}
        to="/"
      >Главная</Link>
      <div>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>Перейти</button>
      </div>
      
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  toNull: propTypes.func.isRequired,
  onAdd: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  toNull: () => {},
  onAdd: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
