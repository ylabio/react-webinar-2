import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ItemBasket(props) {
  const cn = bem("Item");
  const newPrice = props.good.price * props.good.count;

  const callbacks = {
    onDeleteOfBasketHandler: useCallback(() => {
      props.onDeleteOfBasket(props.good.code);
    }, [props.onDeleteOfBasket, props.good.code]),
  };

  return (
      <div className={cn()}>
        <div className={cn("number")}>{props.good.code}</div>
        <div className={cn("title")}>{props.good.title}</div>
        <div className={cn("data")}>
          <p>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
              currencyDisplay: "symbol",
              maximumFractionDigits: 0,
            }).format(newPrice)}
          </p>
          <p>{`${props.good.count} шт`}</p>
        </div>
        <div className={cn("actions")}>
          <button onClick={callbacks.onDeleteOfBasketHandler}>Удалить</button>
        </div>
      </div>
  );
}

ItemBasket.propTypes = {
  good: propTypes.object.isRequired,
  onDeleteOfBasketHandler: propTypes.func.isRequired,
};

ItemBasket.defaultProps = {
  good: {},
  onDeleteOfBasketHandler: () => {},
};

export default React.memo(ItemBasket);
