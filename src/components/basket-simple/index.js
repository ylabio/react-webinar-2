import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import "./styles.css";

function BasketSimple({ sum, amount, onOpen, text }) {
  const cn = bem("BasketSimple");
  return (
    <div className={cn()}>
      <span className={cn("label")}>{text[1]}:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              "товар",
              "товара",
              "товаров"
            )} / ${numberFormat(sum)} ₽`
          : text[2]}
      </span>
      <button className={cn("button")} onClick={onOpen}>
        {text[0]}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(BasketSimple);
