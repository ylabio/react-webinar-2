import React from "react";
import "./sryle.css";
import { cn as bem } from "@bem-react/classname";
import List from "../list";
import propTypes from "prop-types";

const Modal = ({ showModal, item, onDeleteItem, totalPrice }) => {
  const cn = bem("Modal");
  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("content-header")}>
          <h2>Корзина</h2>
          <button onClick={() => showModal()}>Закрыть</button>
        </div>
        {item.length > 0 ? (
          <List items={item} onDeleteItem={onDeleteItem} />
        ) : (
          <h2 className={cn("empty")}>В корзине пусто</h2>
        )}
        {item.length > 0 ? (
          <div className={cn("price")}>
            <span className={cn("price-total")}>
              <strong>Итого </strong>
            </span>
            <span>
              <strong>{totalPrice}</strong>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(Modal);

Modal.propType = {
  showModal: propTypes.func,
  item: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItem: propTypes.func,
  totalPrice: propTypes.number,
};

Modal.defaultProps = {
  showModal: () => {},
  item: [],
  onDeleteItem: () => {},
  totalPrice: 0,
};
