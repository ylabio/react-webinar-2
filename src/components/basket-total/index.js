import React from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import './style.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">
        {props.langPack.subtotal}
      </span>
      <span className="BasketTotal-cell">
        {numberFormat(props.sum)} {props.langPack.currencySymbol}
      </span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  langPack: propTypes.object.isRequired
};

BasketTotal.defaultProps = {
  sum: 0
};

export default React.memo(BasketTotal);
