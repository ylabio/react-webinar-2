import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function BasketSimple({ sum, amount, onOpen, text }) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{text.inTheBasket}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${text.getItemsNumber(amount)} / ${numberFormat(sum)} ₽`
          : text.empty
        }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{text.goToBasket}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  text: propTypes.object
}

BasketSimple.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
  text: {}
}

export default React.memo(BasketSimple);
