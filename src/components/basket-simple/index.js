import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function BasketSimple(props) {
  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <span>
        <span className={cn('label')}>{props.words.inCart}:</span>
        <span className={cn('total')}>
      {props.amount
        ? `${props.amount} ${props.words.goods(props.amount)} / ${numberFormat(props.sum)} ₽`
        : props.words.empty
      }
      </span>
        <button className='BasketSimple__button' onClick={props.onOpen}>{props.words.goCart}</button>
      </span>

    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  words: propTypes.object.isRequired,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
