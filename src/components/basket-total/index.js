import React from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import "./styles.css";
import useTranslate from "../../utils/use-translate";

function BasketTotal(props) {
  const t = (phrase) => useTranslate(phrase);

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{t("basket.total")}</span>
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
