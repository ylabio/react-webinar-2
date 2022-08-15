import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import LangArr from '../lang-array';
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function BasketSimple({sum, amount, onOpen, lang}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <NavLink to="/" className={cn('link')}>{LangArr.basketSimple.link[lang]}</NavLink>
      <div>
        <span className={cn('label')}>{LangArr.basketSimple.label[lang]}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, ...LangArr.basketSimple.amount[lang])} / ${numberFormat(sum)} ₽`
          : LangArr.basketSimple.empty[lang]
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{LangArr.basketSimple.button[lang]}</button>
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
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
