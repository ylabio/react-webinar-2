import propTypes from 'prop-types';
import React from 'react';
import numberFormat from "../../utils/number-format";
import useLanguage from '../../utils/use-language';
import './styles.css';

function BasketTotal(props) {

  const lng = useLanguage();

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{lng("basketStatsLabel")}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number
}

BasketTotal.defaultProps = {
  sum: 0
}

export default React.memo(BasketTotal);