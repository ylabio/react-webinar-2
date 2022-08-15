import React from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import useSelector from "../../utils/use-selector";
import localization from './localization';
import './styles.css';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');

  const select = useSelector(state => ({
    lang: state.localization.lang
  }));
  
  return (
    <div className={cn()}>
      <span className={cn('link')}><Link to="/">{localization[select.lang].link}</Link></span>
      <span className={cn('label')}>{localization[select.lang].inBasket}</span>
      <span className={cn('total')}>
      {amount ? 
        `${amount} ${select.lang === "RU" ? plural(amount, 'товар', 'товара', 'товаров') :
                     amount === 1 ? 'item' : 'items'} / 
                   ${numberFormat(sum)} ₽` : 
        `${localization[select.lang].empty}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {localization[select.lang].openModal}
      </button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
