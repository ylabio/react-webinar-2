import React from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import './styles.css';
import translate from '../../utils/translate';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{translate(props.language, 'total')}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  language: propTypes.string.isRequired,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default React.memo(BasketTotal);
