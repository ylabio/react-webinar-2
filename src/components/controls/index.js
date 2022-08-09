import React from "react";
import propTypes from "prop-types";
import "./style.css";
import Button from "../button/index.js";
import plural from "plural-ru";

function Controls({ toggleOnClick, orders, total }) {
  const currency = total.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });
  return (
    <div className="Controls">
      <div className="Cart">
        В корзине:
        <span className="CartPrice">
          {orders.length
            ? `${orders.length} ${plural(
                orders.length,
                "товар",
                "товара",
                "товаров"
              )} / ${currency} `
            : "пусто"}
        </span>
      </div>
      <Button type="button" onClick={toggleOnClick}>
        Перейти
      </Button>
    </div>
  );
}

export default React.memo(Controls);

Controls.propTypes = {
  toggleOnClick: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.number.isRequired,
};

Controls.defaultProps = {
  toggleOnClick: () => {},
  orders: [],
  total: 0,
};
