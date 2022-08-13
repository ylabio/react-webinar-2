import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import {Link} from "react-router-dom";
import {withLocale} from "../../contexts/locale.context"


function BasketSimple({sum, amount, onOpen, lang}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link to="/" className={cn('nav')} style={{"color": "#0087E9"}}>{lang.handle('home')}</Link>
      <span className={cn('label')}>{lang.handle('inbasket')}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : `${lang.handle('empty')}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{lang.handle('gomodal')}</button>
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
  amount: 0
}

export default React.memo(withLocale(BasketSimple));
