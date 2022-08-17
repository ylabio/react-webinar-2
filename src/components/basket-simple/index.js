import React from 'react';
import {useTranslation} from 'react-i18next';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('BasketSimple')}:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : t('BasketSimpleEmpty')
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{t('BasketSimpleGoTo')}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
