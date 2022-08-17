import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";
import { Link } from "react-router-dom";
import url from "../../configs/url.json";
import useTranslate from "../../utils/use-translate";

function Item(props) {
  const cn = bem("Item");
  const t = (phrase) => useTranslate(phrase);

  const callbacks = {
    onAdd: useCallback(
      (e) => props.onAdd(props.item._id),
      [props.onAdd, props.item]
    ),
  };

  return (
    <div className={cn()}>
      <Link
        to={`${url.BASE_CATALOG_URL}/${props.item._id}`}
        className={cn("title")}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn("button")} onClick={callbacks.onAdd}>
          {t("main.add")}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
};

Item.defaultProps = {};

export default React.memo(Item);
