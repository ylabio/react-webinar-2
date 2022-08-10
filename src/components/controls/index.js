import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { pluralize, numFormat, totalPrice } from "../../utils";
import "./style.css";

function Controls({cart, onClickToggle}) {
  const cn = bem("Controls");
  const goodsQty = cart.length;
  const cartInfo = ` ${goodsQty} ${pluralize(goodsQty)} / `;

  return (
    <div className={cn()}>
      <div className={cn("totals")}>
        {goodsQty === 0 ? (
          <>
            <span className={cn("content-title")}>В корзине: </span>
            <span className={cn("info")}>пусто</span>
          </>
        ) : (
          <>
            <span className={cn("content-title")}>В корзине: </span>
            <span className={cn("info")}>
              {cartInfo}
              {numFormat(totalPrice(cart))}&nbsp;&#8381;
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
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onClickToggle: propTypes.func.isRequired,
};

export default React.memo(Controls);
