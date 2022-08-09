import React, { useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { pluralize, numFormat, totalPrice } from "../../utils";
import Modal from "../modal";
import "./style.css";

function Cart(props) {
  const cn = bem("Cart");
  const [isOpen, setIsOpen] = useState(false);
  const cart = props.cart;
  const goodsQty = cart.length;
  const cartInfo = ` ${goodsQty} ${pluralize(goodsQty)} / `;

  const onClick = () => {
    setIsOpen(!isOpen);
  };

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
        <button className={cn("button-modal-on")} onClick={onClick}>
          Перейти
        </button>
      </div>
      <Modal
        cart={cart}
        isOpen={isOpen}
        onClickToggle={onClick}
        onCart={props.onCart}
      />
    </div>
  );
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onCart: propTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
  onCart: () => {},
};

export default React.memo(Cart);
