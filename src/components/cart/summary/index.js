import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function Summary({ amount }) {
  const cn = bem('Cart');
  return (
    <div className={cn('summary')}>
      <div className='bold-text'>Итого </div>
      <NumberFormat
        className={'bold-text'}
        value={amount}
        suffix=' ₽'
        displayType={'text'}
        thousandSeparator={' '}
      />
    </div>
  );
}

Summary.propTypes = {
  amount: propTypes.number.isRequired,
};

export default React.memo(Summary);
