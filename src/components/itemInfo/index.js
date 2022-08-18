import React from "react";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import propTypes from "prop-types";
import "./styles.css";

const ItemInfo = (props) => {
  let country = {...props.item.maidIn};
  let category = {...props.item.category};

  const cn = bem("ItemInfo")
  return <>
  <div className={cn()}>
    <div className={cn("description")}>
      {props.item.description}
    </div>
    <div className={cn("country")}>
      Страна производитель: <span>{country.title}</span>
    </div>
    <div className={cn("category")}>
      Категория: <span> {category.title} </span>
    </div>
    <div className={cn("year")}>
      Год выпуска: <span>{props.item.edition}</span>
    </div>
    <div className={cn("price")}>
      Цена: {numberFormat(props.item.price)} ₽
    </div>
    <button className={cn("button")} onClick={() => props.onAdd(props.item._id)}>Добавить</button>
  </div>
  </>
}

ItemInfo.propTypes = {
    item: propTypes.object,
    onAdd: propTypes.func
}

export default React.memo(ItemInfo);