import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';


function BasketSimple(props) {

  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <span className={cn('label')}>{props.cartInText}</span>
        <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, props.item0, props.item1, props.item2)} / ${numberFormat(props.sum)} ₽`
          : props.empty
        }
      </span>
      <button className='BasketSimple__button' onClick={props.onOpen}>{props.openText}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  openText: propTypes.string,
  lang: propTypes.number.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  cartInText: propTypes.string,
  item0: propTypes.string,
  item1: propTypes.string,
  item2: propTypes.string,
  empty: propTypes.string
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  openText: 'Перейти',
  cartInText: 'В корзине:',
  item0: 'товар',
  item1: 'товара',
  item2: 'товаров',
  empty: 'пусто'
}

export default React.memo(BasketSimple);
