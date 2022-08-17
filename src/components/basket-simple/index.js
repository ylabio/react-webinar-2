import React , {useCallback} from 'react';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import { Link } from 'react-router-dom';
import Menu from '../menu';

function BasketSimple() {

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const store = useStore();

  const callbacks = {
    openModal: useCallback(() => store.get('modals').open('basket'), []),
  };

  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Menu />
      <div>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
      {select.amount
        ? `${select.amount} ${plural(select.amount, 'товар', 'товара', 'товаров')} / ${numberFormat(select.sum)} ₽`
        : `пусто`
      }
      </span>
      <button className='BasketSimple__button' onClick={callbacks.openModal}>Перейти</button>
      </div>
    </div>
  )
}

export default BasketSimple;