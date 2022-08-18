import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import { translate } from '../../utils/languages';
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <div>
        <span className={cn('label')}>{translate('label')}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, ...translate('amount'))} / ${numberFormat(sum)} ₽`
          : translate('empty')
        }
        </span>
        <button className='BasketSimple__button' onClick={onOpen}>{translate('go')}</button>
      </div>
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
