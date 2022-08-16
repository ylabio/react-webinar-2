import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";
import { Link } from "react-router-dom";

function BasketSimple({ sum, amount, onOpen, translate }) {
  const cn = bem("BasketSimple");
  return (
    <div className={cn()}>
      <span className={cn("label")}>{translate.main.inBasket}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              `${translate.main.product1}`,
              `${translate.main.product2}`,
              `${translate.main.product3}`
            )} / ${numberFormat(sum)} ₽`
          : `${translate.main.empty}`}
      </span>
      <button className={cn("button")} onClick={onOpen}>
        {translate.basket.openModal}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  translate: propTypes.object.isRequired,
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
};

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0,
};

export default React.memo(BasketSimple);
