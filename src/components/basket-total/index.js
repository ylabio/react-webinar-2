import React from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/numberFormat";
import "./styles.css";

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{props.lang}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  lang: propTypes.string,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default React.memo(BasketTotal);
