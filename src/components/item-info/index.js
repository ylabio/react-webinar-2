import React, {useCallback} from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname"
import numberFormat from "../../utils/numberFormat";
import "./style.css"


function ItemInfo(props) {

  const cn = bem('ItemInfo');

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.itemInfo.item._id), [props.onAdd, props.itemInfo])
  };

  return (
    <>
    <div className={cn('')}>
        <div className={cn('description')}>
          {props.itemInfo.item.description}
        </div>
        <div className={cn('made-in')}>
          Страна производитель: <span>{props.itemInfo.itemMadeIn[0]} ({props.itemInfo.itemMadeIn[1]})</span>
        </div>
        <div className={cn('category')}>
          Категория: <span>{props.itemInfo.itemCategory}</span>
        </div>
        <div className={cn('made-year')}>
          Год выпуска: <span>{props.itemInfo.item.edition}</span>
        </div>
        <div className={cn('price')}>
          Цена: <span>{`${numberFormat(props.itemInfo.item.price)} ₽`}</span>
        </div>
        <button className={cn('btn-add')} onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </>
  )
}

ItemInfo.propTypes = {
  itemInfo: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ItemInfo.defaultProps = {
  onAdd: () => {}
}

export default React.memo(ItemInfo);
