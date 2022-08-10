import React from "react";
import propTypes from "prop-types";
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {getPlural} from "../../utils";

function Controls(props) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        В корзине:&nbsp;&nbsp;
        <span>
        {props.cart.unique ? props.cart.unique + getPlural(props.cart.unique, [" товар", " товара", " товаров"]) + " / " + props.cart.total.toLocaleString("ru") + " ₽" : "пусто"}
      </span>
      </div>
      <div className={cn("actions")}>
        <button onClick={props.onButtonEvent}>&nbsp;Перейти&nbsp;</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  cart: propTypes.object.isRequired,
  onButtonEvent: propTypes.func.isRequired // Обяхательное свойство - функция
};

Controls.defaultProps = {
  cart: {},
  onButtonEvent: () => {} // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);
