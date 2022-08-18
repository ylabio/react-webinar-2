import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "utils/number-format";
import './styles.css';

function BasketSimple({sum, amount, onOpen, translation}) {
  const cn = bem('BasketSimple');

  const translationEmpty = translation ? translation('empty') : 'пусто';
  const translationAmount = translation ?
    plural(amount, translation('product'), translation('product2'), translation('product5')) : plural(amount, 'товар', 'товара', 'товаров');

  return (
    <div className={cn()}>
      <span
        className={cn('label')}>{translation ? translation('inBasket') : 'В корзине'}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${translationAmount} / ${numberFormat(sum)} ₽`
        : translationEmpty
      }
      </span>
      <button className='BasketSimple__button'
              onClick={onOpen}>{translation ? translation('go') : 'Перейти'}</button>
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
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
