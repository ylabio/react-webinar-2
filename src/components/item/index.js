import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useCallback } from 'react';
import numberFormat from "../../utils/number-format";
import useLanguage from "../../utils/use-language";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    onTitleClick: useCallback((e) => props.onTitleClick(props.item._id), [props.onTitleClick, props.item])
  };

  const lng = useLanguage();

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')} onClick={callbacks.onTitleClick}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('add')} onClick={callbacks.onAdd}>{lng("buttonAdd")}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onTitleClick: propTypes.func
}

Item.defaultProps = {
  onAdd: () => {},
  onTitleClick: () => {}
}

export default React.memo(Item);
