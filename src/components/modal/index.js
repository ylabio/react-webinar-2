import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numFormat, totalPrice } from "../../utils";
import List from "../list";
import "./style.css";

function Modal(props) {
  const cn = bem("Modal");
  const cart = props.cart;
  const cartIsOpen = props.isOpen
    ? "Modal Modal-display-block"
    : "Modal Modal-display-none";

  return (
    <div className={cartIsOpen}>
      <div className={cn("main")}>
        <div className={cn("head")}>
          <div className={cn("head-title")}>
            <h1>Корзина</h1>
          </div>
          <div className={cn("head-button")}>
            <button
              className={cn("head-button-off")}
              type="button"
              onClick={props.onClickToggle}
            >
              Закрыть
            </button>
          </div>
        </div>
        <List items={cart} butAssign="Удалить" onCart={props.onCart} />
        <div className={cn("totals")}>
          <span className={cn("totals-title")}>Итого:</span>
          <span className={cn("totals-sum")}>
            {numFormat(totalPrice(cart))}&nbsp;&#8381;
          </span>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  isOpen: propTypes.bool.isRequired,
  onClickToggle: propTypes.func.isRequired,
  onCart: propTypes.func.isRequired,
};

Modal.defaultProps = {
  cart: [],
  isOpen: false,
  onClickToggle: () => {},
  onCart: () => {},
};

export default React.memo(Modal);
