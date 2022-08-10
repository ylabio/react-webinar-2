import React from "react";
import propTypes from "prop-types";
import "./style.css";
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";

function Controls(props) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <div className={cn("info")}>
        В корзине:
        {props.basketItemsLength ? (
          <b>
            {`${props.basketItemsLength} 
              ${plural(props.BasketItemsLength, "товар", "товара", "товаров")} 
              / ${props.totalPrice.toLocaleString("ru")} ₽`}
          </b>
        ) : (
          <b>пусто</b>
        )}
      </div>
      <button onClick={props.isBasketOpened}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  totalPrice: propTypes.number,
  basketItemsLength: propTypes.number,
  isBasketOpened: propTypes.func,
};

Controls.defaultProps = {
  totalPrice: 0,
  basketItemsLength: 0,
  isBasketOpened: () => {},
};

export default React.memo(Controls);
