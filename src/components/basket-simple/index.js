import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import localization from './localization';
import './styles.css';


function BasketSimple({sum, amount, onOpen, lang}) {
  const cn = bem('BasketSimple');
  
  return (
    <div className={cn()}>
      <span className={cn('label')}>{localization[lang].inBasket}</span>
      <span className={cn('total')}>
      {amount ? 
        `${amount} ${lang === "RU" ? plural(amount, 'товар', 'товара', 'товаров') :
                     amount === 1 ? 'item' : 'items'} / 
                   ${numberFormat(sum)} ₽` : 
        `${localization[lang].empty}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {localization[lang].openModal}
      </button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func,
  sum: propTypes.number,
  amount: propTypes.number,
  lang: propTypes.string
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: "RU"
}

export default React.memo(BasketSimple);
