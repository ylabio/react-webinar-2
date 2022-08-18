import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <>
      
      <div className={cn()}>
      <div className={cn('links')}>
        <Link to="/" className={cn('linkMain')}>Главная</Link>
      </div>
      <div className={cn('basketInfo')}>
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
    </>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
