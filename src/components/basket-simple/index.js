import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import numberFormat from '../../utils/number-format';
import './styles.css';

function BasketSimple({sum, amount, onOpen, text}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{text.fullness}:</span>
      <span className={cn('total')}>
        {amount ? `${amount} ${text.amount} / ${numberFormat(sum)} ₽` : text.empty}
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {text.open}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  text: propTypes.object.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
};

export default React.memo(BasketSimple);
