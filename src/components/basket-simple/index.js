import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';


function BasketSimple({sum, amount, onOpen, t}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket.inBasket')}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
        : t('basket.empty')
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{t('basket.open')}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  t: propTypes.func
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  t: (text) => text
}

export default React.memo(BasketSimple);
