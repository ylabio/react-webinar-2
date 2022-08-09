import React from "react";
import ReactModal from "react-modal";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numFormat, totalPrice } from "../../utils";
import List from "../list";
import "./style.css";

function Modal(props) {
  const cn = bem("Modal");
  const cart = props.cart

  return (
    <div className={cn()}>
      <ReactModal
        className={cn("component")}
        isOpen={props.isOpen}
        onRequestClose={props.onClickToggle}
        shouldCloseOnOverlayClick={true}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.7)" } }}
      >
        <div className={cn("cart")}>
          <div className={cn("cart-head")}>
            <div className={cn("cart-head-title")}>
              <h1>Корзина</h1>
            </div>
            <div className={cn("cart-head-button")}>
              <button
                className={cn("cart-head-button-off")}
                type="button"
                onClick={props.onClickToggle}
              >
                Закрыть
              </button>
            </div>
          </div>
          <List
            items={cart}
            butAssign="Удалить"
            onCart={props.onCart}
          />
          <div className={cn("totals")}>
            <span className={cn("totals-title")}>Итого:</span>
            <span className={cn("totals-sum")}>
              {numFormat(totalPrice(cart))}&nbsp;&#8381;
            </span>
          </div>
        </div>
      </ReactModal>
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
