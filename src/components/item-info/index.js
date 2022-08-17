import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import "./style.css"
import numberFormat from "../../utils/number-format";


function ItemInfo(props) {
  const cn = bem('Item-info');
  if (props.item) {
    const { category, description, maidIn, edition, price, _id } = props.item
    return (
      <>
        <div className={cn()}>
          <p>{description}</p>
          <p>Страна производитель: <span>{maidIn.title} ({maidIn.code})</span></p>
          <p>Категория: <span>{category.title}</span></p>
          <p>Год выпуска: <span>{edition}</span></p>
          <div className={cn("price")}>Цена: {numberFormat(price)} ₽</div>
        </div>
        <button className={cn("button")} onClick={() => { props.onAdd(_id) }}>Добавить</button>
      </>
    )
  }

  ItemInfo.propTypes = {
    item: propTypes.object,
    onAdd: propTypes.func
  }

  ItemInfo.defaultProps = {
    item: null,
    onAdd: () => { },
  }
}

export default React.memo(ItemInfo) 
