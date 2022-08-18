import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  
  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    viewProduct: useCallback(() => props.viewProduct(props.item._id), [props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div onClick={callbacks.viewProduct} className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.translation("add")}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  translation: propTypes.func,
  onAdd: propTypes.func,
  viewProduct: propTypes.func,
}

Item.defaultProps = {
  translation: () => {},
  onAdd: () => {},
  viewProduct: () => {},
}

export default React.memo(Item);
