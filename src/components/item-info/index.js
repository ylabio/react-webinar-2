import useStore from "../../utils/use-store";
import React, { useCallback } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import "./style.css"
import numberFormat from "../../utils/number-format";
import useSelector from "../../utils/use-selector";
import { Navigate } from "react-router";

function ItemInfo(props) {
  const cn = bem('Item-info');
  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };
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
        <button className={cn("button")} onClick={() => { callbacks.addToBasket(_id) }}>Добавить</button>
      </>
    )
  }

  ItemInfo.propTypes = {
    item: propTypes.object
  }

  ItemInfo.defaultProps = {
    item: null
  }
}

export default React.memo(ItemInfo) 
