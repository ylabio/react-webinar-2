import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import Link from "../link";
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function BasketSimple({words, sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link 
        link='/' 
        color='blue'
      >
        {words.homeLink}
      </Link>
      <div className={cn('basket')}>
        <span className={cn('label')}>{words.inBasket}</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, words.product, words.twoProduct, words.products)} / ${numberFormat(sum)} ₽`
          : words.empty
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{words.openModal}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  words: propTypes.object.isRequired,
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
