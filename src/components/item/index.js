import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

import Button from '../button';

function Item({ item, onAdd }) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>
        {item.price.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0,
        })}{" "}
      </div>

      <Button onClick={() => onAdd(item)}  children={'Добавить'} />

    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
};


Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
