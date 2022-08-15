import React from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import './styles.css';

function BasketTotal(props) {
  return (
    <div className='BasketTotal'>
      <span className='BasketTotal-cell'>
        {props.language === 'ru' ? props.words.ru.total : props.words.eng.total}
      </span>
      <span className='BasketTotal-cell'> {numberFormat(props.sum)} ₽</span>
      <span className='BasketTotal-cell'></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: propTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default React.memo(BasketTotal);
