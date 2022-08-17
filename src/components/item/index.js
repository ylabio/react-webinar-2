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
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          to={props.itemLink}
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
  itemLink: propTypes.string,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  itemLink: '/',
  onAdd: () => {},
}

export default React.memo(Item);