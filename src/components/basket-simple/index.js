import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import "./styles.css";

function BasketSimple({ sum, amount, onOpen, children, lang }) {
  const cn = bem("BasketSimple");
  return (
    <div className={cn()}>
      {children}
      <span className={cn("label")}>{lang.inBasket}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${lang.products(amount)} / ${numberFormat(sum)} ₽`
          : lang.empty}
      </span>
      <button className="BasketSimple__button" onClick={onOpen}>
        {lang.toBasket}
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
