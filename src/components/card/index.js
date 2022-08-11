import React from "react";
import { cn as bem } from "@bem-react/classname";
import CardList from "../card-list";
import PropTypes from "prop-types";

import "./style.css";

const Card = ({ cardItems, onModalClose, onCardItemDelete }) => {
  const cn = bem("Card");
  const onClickClose = (e) => {
    if (e.target.className === "Card") {
      onModalClose();
    }
  };

  const onEsc = (e) => {
    if (e.key === "Escape") {
      onModalClose();
    }
  };
  return (
    <div className={cn()} onClick={onClickClose} onKeyDown={onEsc} tabIndex="0">
      <div className={cn("container")}>
        <div className={cn("header")}>
          <h3 className={cn("title")}>Корзина</h3>
          <button onClick={onModalClose}>Закрыть</button>
        </div>
        {cardItems.length !== 0 ? (
          <CardList items={cardItems} onCardItemDelete={onCardItemDelete} />
        ) : (
          <h1 style={{ textAlign: "center" }}>Корзина пуста</h1>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  cardItems: PropTypes.array.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onCardItemDelete: PropTypes.func.isRequired,
};
Card.defaultProps = {
  cardItems: [],
  onModalClose: () => {},
  onCardItemDelete: () => {},
};
export default React.memo(Card);
