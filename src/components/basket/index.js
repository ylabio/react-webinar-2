import React from "react";
import propTypes from "prop-types";
import BasketHeader from "../basket-header";
import BasketItem from "../basket-item";
import BasketOverall from "../basket-overall";
import "./style.css";

const Basket = ({
  items,
  modalOpen,
  closeToCart,
  removeItemToCart,
  overall,
}) => {
  return (
    <div className={modalOpen ? "modal-cover show-modal" : "modal-cover"}>
      <div className="basket">
        <BasketHeader closeToCart={closeToCart} />
        {items.map(({ code, title, price, quantity }, i) => (
          <BasketItem
            index={i}
            item={{ code, title, price, quantity }}
            removeItemToCart={removeItemToCart}
          />
        ))}
        {items.length > 0 && <BasketOverall overall={overall} />}
      </div>
    </div>
  );
};

Basket.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  modalOpen: propTypes.bool.isRequired,
  closeToCart: propTypes.func.isRequired,
  removeItemToCart: propTypes.func.isRequired,
  overall: propTypes.number.isRequired,
};

Basket.defaultProps = {
  closeToCart: () => {},
  removeItemToCart: () => {},
};

export default React.memo(Basket);
