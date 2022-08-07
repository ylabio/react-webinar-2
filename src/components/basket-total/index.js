import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function BasketTotal({ sum }) {
  const cn = bem("BasketTotal");
  return (
    <div className={cn()}>
      <span className={cn("title")}>Итого</span>
      <span className={cn("total")}>{sum.toLocaleString()} ₽</span>
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
