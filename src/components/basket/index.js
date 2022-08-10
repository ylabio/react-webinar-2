import React, { useEffect } from "react";
import propTypes from "prop-types";
import "./style.css";

const Basket = ({
  items,
  modalOpen,
  closeToCart,
  removeItemToCart,
  overall,
}) => {
  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [modalOpen]);

  return (
    <div className={modalOpen ? "modal-cover show-modal" : "modal-cover"}>
      <div className="basket">
        <div className="basket__header">
          <h2>Корзина</h2>
          <button onClick={closeToCart}>Закрыть</button>
        </div>

        {items.map(({ code, title, price, quantity }, i) => (
          <div key={code} className="basket__item">
            <div className="basket__item_number">{i + 1}</div>
            <div className="basket__item_title">{title}</div>
            <div className="basket__item_price">
              {`${price.toLocaleString()} ₽`}
            </div>
            <div className="basket__item_quantity">{`${quantity} шт`}</div>
            <div className="basket__item_actions">
              <button onClick={() => removeItemToCart(code)}>Удалить</button>
            </div>
          </div>
        ))}

        {overall !== 0 && (
          <div className="basket__overall">
            <div>Итого</div> <span>{overall.toLocaleString()} ₽</span>
          </div>
        )}
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
