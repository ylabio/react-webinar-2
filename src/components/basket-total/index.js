import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">
        {props.translationData.total}
      </span>
      <span className="BasketTotal-cell">
        {props.sum.toLocaleString(props.lang === 'ru' ? 'ru' : 'en')} ₽
        </span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  translationData: propTypes.object.isRequired,
};

BasketTotal.defaultProps = {
  sum: 0
};

export default React.memo(BasketTotal);
