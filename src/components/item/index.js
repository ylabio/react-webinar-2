import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { Button } from "../button";

function Item(props) {
  const cn = bem('Item');
  console.log(props);

  const callbacks = {
    onClick: useCallback(
      (e) => {
        e.stopPropagation();
        props.onClick(props.item);
      },
      [props.onClick, props.item]
    ),
  };

  return (
    <div className={cn({'selected': props.item})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString()}&nbsp;₽
      </div>
      {props.quantity && (
        <div className={cn('quantity')}>
          {props.quantity}&nbsp;шт
        </div>
      )}
      <div className={cn('actions')}>
        <Button text={props.text} onClick={callbacks.onClick} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
  quantity: propTypes.number,
  text: propTypes.string,
};

Item.defaultProps = {
  item: {},
  onClick: () => {},
  quantity: null,
  text: null,
};

export default React.memo(Item);
