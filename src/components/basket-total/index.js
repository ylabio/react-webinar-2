import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';
import { localize } from '../../utils/localize';
import useSelector from '../../utils/use-selector';

function BasketTotal(props) {
  const select = useSelector(state => ({
    language: state.localization.language,
  }));

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{localize['Итого'][select.language]}</span>
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
