import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketSimple({sum, amount, onOpen, language, translate, codesBasketSimple}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate(language, codesBasketSimple.CODE_2) || 'В корзине'}</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, ...(translate(language, codesBasketSimple.CODE_1) || ['товар', 'товара', 'товаров']))} / ${numberFormat(sum)} ₽`
        : `${translate(language, codesBasketSimple.CODE_4) || 'пусто'}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{translate(language, codesBasketSimple.CODE_3) || 'Перейти'}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  codesBasketSimple: propTypes.object.isRequired,
  translate: propTypes.func.isRequired,
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number.isRequired,
  amount: propTypes.number.isRequired,
  language: propTypes.string.isRequired,
}

BasketSimple.defaultProps = {
  codesBasketSimple: {},
  translate: () => {},
  onOpen: () => {},
  sum: 0,
  amount: 0,
}

export default React.memo(BasketSimple);
