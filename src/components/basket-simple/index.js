import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';


function BasketSimple({sum, amount, onOpen, text}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{text.inCart}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, ...text.itemsPlural)} / ${numberFormat(sum)} ₽`
        : `${text.empty}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {text.enter}
      </button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  text: propTypes.object,
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  text: {},
}

export default React.memo(BasketSimple);
