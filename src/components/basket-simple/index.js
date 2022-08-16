import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import Link from "../link";
import numberFormat from "../../utils/numberFormat";
import titleLang from "../../utils/titleLang";
import './styles.css';


function BasketSimple({lang, sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link 
        link='/' 
        color='blue'
      >
        {titleLang(lang, 'homeLink')}
      </Link>
      <div className={cn('basket')}>
        <span className={cn('label')}>{titleLang(lang, 'inBasket')}</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, titleLang(lang, 'product'), titleLang(lang, 'twoProduct'), titleLang(lang, 'products'))} / ${numberFormat(sum)} ₽`
          : titleLang(lang, 'empty')
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{titleLang(lang, 'openModal')}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  lang: propTypes.string.isRequired,
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
