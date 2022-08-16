import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketSimple({sum, amount, onOpen, language, translate}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate(language, 'IN_BASKET') || 'В корзине'}</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${language === 'ru' ? plural(amount, 'товар', 'товара', 'товаров') : plural(amount, 'product', 'goods', 'goods')} / ${numberFormat(sum)} ₽`
        : `${translate(language, 'EMPTY') || 'пусто'}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{translate(language, 'GO_TO_CART') || 'Перейти'}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  translate: propTypes.func.isRequired,
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number.isRequired,
  amount: propTypes.number.isRequired,
  language: propTypes.string.isRequired,
}

BasketSimple.defaultProps = {
  translate: () => {},
  onOpen: () => {},
  sum: 0,
  amount: 0,
}

export default React.memo(BasketSimple);
