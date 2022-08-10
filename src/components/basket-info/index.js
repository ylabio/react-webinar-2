import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import numberFormat from "../../utils";
import "./style.css";

function BasketInfo({ amount, sum, onOpen }) {
  const cn = bem("BasketInfo");
  return (
    <div className={cn()}>
      <span className={cn("title")}>В корзине:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              "товар",
              "товара",
              "товаров"
            )} / ${numberFormat(sum)} ₽`
          : `пусто`}
      </span>
      <button className={cn("button")} onClick={onOpen}>
        Перейти
      </button>
    </div>
  );
}

BasketInfo.propTypes = {
  onOpen: propTypes.func.isRequired,
  amount: propTypes.number,
  sum: propTypes.number,
};

BasketInfo.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(BasketInfo);
