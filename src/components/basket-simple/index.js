import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import {Link} from "react-router-dom";


function BasketSimple({sum, amount, onOpen, words}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link to='/' className={cn('navigate')}>{words.main}</Link>
      <div>
        <span className={cn('label')}>{words.inCart}</span>
        <span className={cn('total')}>
      {words.item === 'товар' ?
      amount ?
        `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : words.empty
      :
        amount ?
        `${amount} ${words.item}${amount !== 1 ? 's': ''} / ${numberFormat(sum)} ₽`: words.empty
      }
      </span>
        <button className='BasketSimple__button' onClick={onOpen}>{words.goTo}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
