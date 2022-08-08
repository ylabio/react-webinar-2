import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { pluralize, numFormat, getPrice } from "../../utils";
import Modal from "../modal";
import "./style.css";

function Controls(props) {
  const cn = bem("Controls");
  const [isOpen, setIsOpen] = useState(false);

  const items = props.items;
  const cart = props.cart;
  const goodsQty = cart.reduce((total, item) => item.qty + total, 0);
  const totalPrice = cart.reduce(
    (total, item) => item.qty * getPrice(item.code, items) + total,
    0
  );
  const cartInfo = ` ${goodsQty} ${pluralize(goodsQty)} / `;

  const callbacks = {
    onClick: useCallback(() => {
      setIsOpen(!isOpen);
    }),
  };

  return (
    <div className={cn()}>
      <div className={cn("totals")}>
        {goodsQty === 0 ? (
          <>
            <span className={cn("cart-content-title")}>В корзине: </span>
            <span className={cn("cart-info")}>пусто</span>
          </>
        ) : (
          <>
            <span className={cn("cart-content-title")}>В корзине: </span>
            <span className={cn("cart-info")}>
              {cartInfo}
              {numFormat(totalPrice)}&nbsp;&#8381;
            </span>
          </>
        )}
      </div>
      <div className={cn("actions")}>
        <button className={cn("button-modal-on")} onClick={callbacks.onClick}>
          Перейти
        </button>
      </div>
      <Modal
        items={items}
        cart={cart}
        isOpen={isOpen}
        onClickToggle={callbacks.onClick}
        onCart={props.onCart}
      />
    </div>
  );
}

Controls.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onCart: propTypes.func.isRequired,
};

Controls.defaultProps = {
  items: [],
  cart: [],
  onCart: () => {},
};

export default React.memo(Controls);
