import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketSimple(props) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <span className={cn('label')}>{props.translate("incart")}</span>
        <span className={cn('total')}>
        {props.amount
          ? (`${props.amount} ${plural(props.amount, 'товар', 'товара', 'товаров')} / ${numberFormat(props.sum)} ₽`)
          : (props.translate("empty"))
        }
        </span>
        <button className='BasketSimple__button' onClick={props.onOpen}>{props.translate("gotocart")}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  translate: propTypes.func,
  setCurrentPage: propTypes.func,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  translate: () => {},
  sum: 0,
  amount: 0,
  setCurrentPage: null
}

export default React.memo(BasketSimple);
