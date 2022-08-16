import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import { Link } from 'react-router-dom';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')}
          to={`${props.linkTo}/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('add')}
          onClick={callbacks.onAdd}>
          {props.text.add}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  linkTo: propTypes.string,
  text: propTypes.object
}

Item.defaultProps = {
  onAdd: () => { },
  linkTo: "/",
  text: {}
}

export default React.memo(Item);
