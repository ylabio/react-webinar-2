import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import changeLanguage from "../../utils/changeLanguage";


function BasketSimple({sum, amount, onOpen, language}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{changeLanguage(language, 'IN_BASKET')}</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${language === 'ru'? plural(amount, 'товар', 'товара', 'товаров') : plural(amount, 'product', 'goods', 'goods')} / ${numberFormat(sum)} ₽`
        : `${language === 'ru'? 'пусто' : 'empty'}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{changeLanguage(language, 'GO_TO_CART')}</button>
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
