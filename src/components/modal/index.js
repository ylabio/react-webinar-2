import React from "react";
import ReactModal from "react-modal";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { getTitle, getPrice, numFormat } from "../../utils";
import List from "../list";
import "./style.css";

function Modal(props) {
  const cn = bem("Modal");
  const items = props.items;
  const cart = props.cart;

  const cartFullItems = cart.map((obj) =>
    Object.assign(obj, {
      title: getTitle(obj.code, items),
      price: getPrice(obj.code, items),
    })
  );
  console.log("cartFullItems", cartFullItems);

  const totalPrice = cart.reduce(
    (total, item) => item.qty * getPrice(item.code, items) + total,
    0
  );

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
            items={cartFullItems}
            butAssign="Удалить"
            onCart={props.onCart}
          />
          <div className={cn("totals")}>
            <span className={cn("totals-title")}>Итого:</span>
            <span className={cn("totals-sum")}>
              {numFormat(totalPrice)}&nbsp;&#8381;
            </span>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

Modal.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  isOpen: propTypes.bool.isRequired,
  onClickToggle: propTypes.func.isRequired,
  onCart: propTypes.func.isRequired,
};

Modal.defaultProps = {
  items: [],
  cart: [],
  isOpen: false,
  onClickToggle: () => {},
  onCart: () => {},
};

export default React.memo(Modal);
