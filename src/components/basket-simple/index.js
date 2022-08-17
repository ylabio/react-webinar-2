import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import NavBar from "../nav-bar";


function BasketSimple({lang, sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <span className={cn('label')}>{lang.inCart}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, `${lang.product}`, `${lang.prod}`, `${lang.products}`)} / ${numberFormat(sum)} ₽`
          : `${lang.empty}`
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{lang.open}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  lang: propTypes.object
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: {},
}

export default React.memo(BasketSimple);
