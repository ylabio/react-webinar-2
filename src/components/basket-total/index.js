import React, {useContext} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {LocalisationContext} from "l10n";
import {l10n} from "l10n/strings";
import './styles.css';

function BasketTotal(props) {
  const {lang} = useContext(LocalisationContext);

  const total = l10n.cart.total[lang];

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{total}</span>
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
