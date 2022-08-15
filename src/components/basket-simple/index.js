import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import {Link} from 'react-router-dom';

function BasketSimple({sum, amount, onOpen, language}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link to={`/`} className={cn('home') }>{language.mainPage}</Link>
      <span className={cn('label')}>{language.inBasket}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : `${language.empty}`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{language.goBasket}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  language: propTypes.object.isRequired
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
