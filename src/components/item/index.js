import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numFormat } from "../../utils";
import "./style.css";

function Item({item, buttonAssign, onCart}) {
  const cn = bem("Item");
  const itemQty = <span>{item.qty}&nbsp;шт.</span>;

  const onClick = () => {
    onCart(item);
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>
        {numFormat(item.price)}&nbsp;&#8381;
      </div>
      {item.qty ? <div className={cn("qty")}>{itemQty}</div> : null}
      <div className={cn("actions")}>
        <button className={cn("add-delete-btn")} onClick={onClick}>
          {buttonAssign}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  buttonAssign: propTypes.string.isRequired,
  onCart: propTypes.func.isRequired,
};

export default React.memo(Item);
