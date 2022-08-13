import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function BasketSimple({sum, amount, onOpen, lang}) {
  const cn = bem('BasketSimple');

  const basketStatus = lang === 'rus' ? 'Пусто' : 'Empty';
  const itemsPlural = lang === 'rus' ? ['товар', 'товара', 'товаров'] : ['item', 'items', 'items'];

  return (
    <div className={cn()}>
      <Link to="/" className={cn('main')}>
        {lang === 'rus' ? 'Главная' : 'Main'}
      </Link>
      <span className={cn('label')}>{lang === 'rus' ? 'В корзине' : 'In Cart'}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, ...itemsPlural)} / ${numberFormat(sum)} ₽`
        : `${basketStatus}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {lang === 'rus' ? 'Перейти' : 'Go'}
      </button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  lang: propTypes.string
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: 'rus'
}

export default React.memo(BasketSimple);
