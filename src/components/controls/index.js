import React, { useState } from "react";
import propTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import Modal from "../modal";

function Controls(props) {
  const cn = bem("Controls");
  const [isOpenBasket, setIsOpenBasket] = useState(false);

  let itemInBasket = "пусто";
  let lengthStateBasket = props.stateBasket.length;

  if (lengthStateBasket) {
    let price = props.calculationSumPrice(props.stateBasket);

    price = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      currencyDisplay: "symbol",
      maximumFractionDigits: 0,
    }).format(price);

    itemInBasket = `${lengthStateBasket} ${plural(
      lengthStateBasket,
      "товар",
      "товара",
      "товаров"
    )} / ${price}`;
  }

    const openBasketHandler = () => {
      setIsOpenBasket(true);
    }

    const closeBasketHandler = () => {
      setIsOpenBasket(false);
    }

  return (
    <React.Fragment>
      {isOpenBasket ? (
        <Modal
          stateBasket={props.stateBasket}
          onCloseBasket={closeBasketHandler}
          onDeleteOfBasket={props.onDeleteOfBasket}
          calculationSumPrice={props.calculationSumPrice}
        />
      ) : (
        ""
      )}
      <div className={cn()}>
        <p className={cn("basket")}>
          В корзине:
          <span className={cn("basketInfo")}>{itemInBasket}</span>
        </p>
        <button onClick={openBasketHandler} className={cn("button")}>
          Перейти
        </button>
      </div>
    </React.Fragment>
  );
}

Controls.propTypes = {
  stateBasket: propTypes.array.isRequired,
  openBasketHandler: propTypes.func.isRequired,
  closeBasketHandler: propTypes.func.isRequired
};

Controls.defaultProps = {
  stateBasket: [],
  openBasketHandler: () => {},
  closeBasketHandler: () => {}
};

export default Controls;
