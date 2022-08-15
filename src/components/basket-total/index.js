import React from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import translation from "../../utils/translation";
import "./styles.css";

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">
        {translation(props.lng, "total")}:
      </span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: propTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default React.memo(BasketTotal);
