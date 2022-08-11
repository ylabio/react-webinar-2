import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import ItemBasket from "../item-basket";
import "./style.css";

function ListBasket(props) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {props.stateBasket.map((good) => (
        <div key={good.code} className={cn("item")}>
          <ItemBasket good={good} onDeleteOfBasket={props.onDeleteOfBasket} />
        </div>
      ))}
      {props.stateBasket.length > 0 ? (
        <div className={cn('total')}>Итого <span className={cn('totalPrice')}>{props.totalPrice}</span></div>
      ) : (
        ""
      )}
    </div>
  );
}

ListBasket.propTypes = {
  stateBasket: propTypes.array,
  onDeleteOfBasket: propTypes.func,
};

ListBasket.defaultProps = {
  onDeleteOfBasket: () => {},
};

export default React.memo(ListBasket);
