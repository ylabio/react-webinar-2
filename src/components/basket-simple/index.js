import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';


function BasketSimple({language, translate, sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>     
        <span className={cn('label')}>{translate(language, 'In_basket')}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
          : translate(language, 'empty')
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{translate(language, 'Go_cart')}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  language: propTypes.string,
  translate: propTypes.func,
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  language: 'RU',
  translate: (langugage, key) => key,
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
