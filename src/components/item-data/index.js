import React from "react";
import {cn as bem} from "@bem-react/classname";
import "./styles.css";
import propTypes from "prop-types";
import numberFormat from "../../utils/numberFormat";


const ItemData = (props) => {
  let maidIn = {...props.item.maidIn};
  let category = {...props.item.category};
  const cn = bem("ItemData")
  return (
  <div className={cn()}>
    <div>
      {props.item.description}
    </div>
    <div>
      <p>Страна производитель: <span>{maidIn.title}</span></p>  
      <p>Категория: <span> {category.title} </span></p>   
      <p>Год выпуска: <span>{props.item.edition}</span></p>   
      <span>Цена: {numberFormat(props.item.price)} ₽</span>
    </div>
    <button className={cn("button")} onClick={() => props.onAdd(props.item._id)}>Добавить</button>
  </div>
  )
}

ItemData.propTypes = {
    item: propTypes.object,
    onAdd: propTypes.func
}

export default React.memo(ItemData); 