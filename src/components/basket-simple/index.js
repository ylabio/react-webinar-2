import React from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import useTranslation from '../../utils/use-translation';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  const translation = useTranslation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to ="/1">{translation.main.home_link}</Link>
      <div className={cn('right')}>
        <span className={cn('label')}>{translation.main.at_cart}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
          : `${translation.main.empty}`
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{translation.main.go_to}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
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
