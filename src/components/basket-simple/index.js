import React from 'react';
import propTypes from 'prop-types';
import plural_ru from "plural-ru";
import plural_en from 'pluralize';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import Translate from '../../components/translate';
import useSelector from '../../utils/use-selector';
import './styles.css';


function BasketSimple({sum, amount, onOpen, lang}) {
  const cn = bem('BasketSimple');
  const text = lang === 'en' 
    ? plural_en("item", amount)
    : plural_ru(amount, 'товар', 'товара', 'товаров')

  return (
    <div className={cn()}>
      <span className={cn('label')}><Translate>В корзине</Translate>:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${text} / ${numberFormat(sum)} ₽`
        : <Translate>пусто</Translate>
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        <Translate>Перейти</Translate>
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
  lang: 'ru'
}

export default React.memo(BasketSimple);
