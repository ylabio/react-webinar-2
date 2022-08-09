import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numFormat } from "../../utils";
import "./style.css";

function Item(props) {
  const cn = bem("Item");
  const itemQty = <span>{props.item.qty}&nbsp;шт.</span>;

  const onClick = () => {
    console.log(`нажата кнопка ${props.butAssign}`);
    props.onCart(props.item);
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>
        {numFormat(props.item.price)}&nbsp;&#8381;
      </div>
      {props.item.qty ? <div className={cn("qty")}>{itemQty}</div> : null}
      <div className={cn("actions")}>
        <button className={cn("add-delete-btn")} onClick={onClick}>
          {props.butAssign}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  butAssign: propTypes.string.isRequired,
  onCart: propTypes.func.isRequired,
};

Item.defaultProps = {
  item: {},
  butAssign: "",
  onCart: () => {},
};

export default React.memo(Item);
