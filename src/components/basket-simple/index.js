import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import translation from "../../utils/translation";
import "./styles.css";

function BasketSimple({ sum, amount, onOpen, lng }) {
  const cn = bem("BasketSimple");
  return (
    <div className={cn()}>
      <span className={cn("label")}>{translation(lng, "inBasket")}:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              "товар",
              "товара",
              "товаров"
            )} / ${numberFormat(sum)} ₽`
          : `${translation(lng, "empty")}`}
      </span>
      <button className="BasketSimple__button" onClick={onOpen}>
        {translation(lng, "go")}
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
