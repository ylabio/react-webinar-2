import React from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import useSelector from "../../utils/use-selector";
import localization from './localization';
import './styles.css';

function BasketTotal(props) {
  const select = useSelector(state => ({
    lang: state.localization.lang
  }));
  
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{localization[select.lang].total}</span>
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
