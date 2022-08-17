import React from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function BasketSimple({sum, amount, onOpen, translation}) {
  const cn = bem('BasketSimple');

  console.log("Render BasketSimple");

  return (
    <div className={cn()}>
      <div className={cn('right')}>
        <span className={cn('label')}>{translation('at_cart')}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, ...translation('product'))} / ${numberFormat(sum)} ₽`
          : `${translation('empty')}`
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{translation('go_to')}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  translation: propTypes.func,
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  translation: () => {},
}

export default React.memo(BasketSimple);
