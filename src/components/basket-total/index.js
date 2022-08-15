import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import locText from "../../utils/localization";
import numberFormat from "../../utils/number-format";
import useSelector from "../../utils/use-selector";
import './styles.css';

function BasketTotal(props) {

  const language = useSelector(state => state.localization.lang);
  useEffect(() => {}, [language]);

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{locText("basketStatsLabel")}</span>
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