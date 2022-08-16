import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { Link } from 'react-router-dom';
import { langVars } from './../../utils/localisation';


function BasketSimple({sum, amount, onOpen, lang}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <div>
      <span className={cn('label')}>{langVars.basketSimple.inCart[lang]}</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : `${langVars.basketSimple.empty[lang]}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{langVars.basketSimple.moveTo[lang]}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  lang: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
