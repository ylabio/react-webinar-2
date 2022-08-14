import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import { Link } from "react-router-dom";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item]),
    // onClick: useCallback(() => props.goToArticle(props.item._id), [props.goToArticle, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          to={`article/${props.item._id}`}
          className={cn('title__pointer')}
          onClick={callbacks.onClick}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price, {maximumFractionDigits: 0})} ₽</div>
        <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onClick: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
  onClick: () => {},
}

export default React.memo(Item);