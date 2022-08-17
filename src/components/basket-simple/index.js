import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function BasketSimple({sum, amount, onOpen, inBasketText, item1Name, item2Name, item3Name, emptyText, goButtonName}) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{inBasketText}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, item1Name, item2Name, item3Name)} / ${numberFormat(sum)} ₽`
        : `${emptyText}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{goButtonName}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  inBasketText: propTypes.string,
  item1Name: propTypes.string,
  item2Name: propTypes.string,
  item3Name: propTypes.string,
  emptyText: propTypes.string,
  goButtonName: propTypes.string
}

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0,
  inBasketText: 'В корзине',
  item1Name: 'товар',
  item2Name: 'товара',
  item3Name: 'товаров',
  emptyText: 'пусто',
  goButtonName: 'Перейти'
}

export default React.memo(BasketSimple);
