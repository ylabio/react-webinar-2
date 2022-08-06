import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import plural from "plural-ru";
import Modal from "../modal";

function Controls({ cartItems, onDeleteItem }) {
  const [cartPrice, setCartPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [modalIsActive, setModalIsActive] = useState(false);

  const cn = bem("Controls");

  const showModal = () => {
    setModalIsActive(!modalIsActive);
  };

  useEffect(() => {
    setCartCount(cartItems.length);
    setCartPrice(
      cartItems.reduce((prev, curr) => {
        return prev + curr.price * curr.amount;
      }, 0)
    );
  }, [cartItems]);
  return (
    <div className="Controls">
      {cartPrice !== 0 ? (
        <span className={cn("price")}>
          В корзине:{" "}
          <strong className={cn("price-rub")}>
            {cartCount} {plural(cartCount, "товар", "товара", "товаров")} /{" "}
            {cartPrice}
          </strong>
        </span>
      ) : (
        <span className={cn("price")}>
          В корзине: <strong>Пусто</strong>
        </span>
      )}

      <button onClick={showModal}>Перейти</button>
      {modalIsActive && (
        <Modal
          totalPrice={cartPrice}
          onDeleteItem={onDeleteItem}
          item={cartItems}
          showModal={showModal}
        ></Modal>
      )}
    </div>
  );
}

Controls.propTypes = {
  onDeleteItem: propTypes.func.isRequired,
};

Controls.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Controls);
