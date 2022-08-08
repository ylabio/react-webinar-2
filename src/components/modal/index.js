import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import { allBuy } from "../../utils";
import "./style.css";

function Modal({ setModal, buyState, itemClick }) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        <h1>Корзина</h1>{" "}
        <button onClick={() => setModal(false)}>Закрыть</button>
      </div>
      {buyState.length ? (
        buyState.map((item, index) => (
          <div key={index} className={cn("item")}>
            <Item item={item} itemClick={itemClick} />
          </div>
        ))
      ) : (
        <div className={cn("none")}>
          <b>пусто</b>
        </div>
      )}
      <div className={cn("end")}>
        <b>Итого</b>
        <b>{buyState.length && allBuy(buyState)} ₽</b>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setModal: propTypes.func,
  itemClick: propTypes.func,
  buyState: propTypes.array,
};

Modal.defaultProps = {
  setModal: () => {},
  itemClick: () => {},
  buyState: [],
};

export default React.memo(Modal);
