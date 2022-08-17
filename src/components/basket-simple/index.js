import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';

function BasketSimple({t, sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket')}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : t('empty')
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{t('go')}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  t: propTypes.func,
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
