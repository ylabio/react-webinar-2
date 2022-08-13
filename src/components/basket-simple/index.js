import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import numberFormat from '../../utils/number-format';
import './styles.css';

function BasketSimple({sum, amount, onOpen, local, onHomeClick}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{local.common.basketFullnessLabel}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${local.common.basketAmount(amount)} / ${numberFormat(sum)} ₽`
          : local.common.basketEmpty}
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>
        {local.common.openCart}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  local: propTypes.object
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
};

export default React.memo(BasketSimple);
