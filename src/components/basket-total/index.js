import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';
import useSelector from '../../utils/use-selector';

function BasketTotal(props) {

  const select = useSelector(state => ({
    totalText: state.names.names.totalText,
  }));
  
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{select.totalText}</span>
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
