import React , {useCallback} from 'react';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketSimple({amount , sum , onOpen}) {

  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <div>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : `пусто`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>Перейти</button>
      </div>
    </div>
  )
}

export default BasketSimple;