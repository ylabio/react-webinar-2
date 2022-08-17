import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import translate from '../../utils/translate';

function BasketSimple({ sum, amount, onOpen, lang }) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate(lang, 'В корзине')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate(lang, 'товар'), translate(lang, 'товара'), translate(lang, 'товаров'))} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{translate(lang, 'Перейти')}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  lang: propTypes.string,
}

BasketSimple.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
  lang: 'ru'
}

export default React.memo(BasketSimple);
