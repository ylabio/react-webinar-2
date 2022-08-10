import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { pluralize, numFormat } from "../../utils";
import "./style.css";

function Controls({cartTotals, onClickToggle}) {
  const cn = bem("Controls");
  const qty = cartTotals.qty;
  const cartInfo = ` ${qty} ${pluralize(qty)} / `;

  return (
    <div className={cn()}>
      <div className={cn("totals")}>
        {qty === 0 ? (
          <>
            <span className={cn("content-title")}>В корзине: </span>
            <span className={cn("info")}>пусто</span>
          </>
        ) : (
          <>
            <span className={cn("content-title")}>В корзине: </span>
            <span className={cn("info")}>
              {cartInfo}
              {numFormat(cartTotals.totalPrice)}&nbsp;&#8381;
            </span>
          </>
        )}
      </div>
      <div className={cn("actions")}>
        <button className={cn("button-modal-on")} onClick={onClickToggle}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  cartTotals: propTypes.object.isRequired,
  onClickToggle: propTypes.func.isRequired,
};

export default React.memo(Controls);
